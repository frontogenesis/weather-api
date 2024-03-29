const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

const User = require('../models/user')

router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch(error) {
    res.status(400).send()
  }
})

router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    sendCancellationEmail(req.user.email, req.user.name)
    res.send(req.user)
  } catch(error) {
    res.status(500).send()
  }
})

const upload = multer({
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  }
})

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer)
  .resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch(error) {
    res.status(404).send()
  }
})

router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    sendWelcomeEmail(user.name, user.email)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch(error) {
    res.status(400).send(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch(error) {
    res.status(400).send()
  }
})

router.post('/logout', auth, async (req, res) => {
  // Remove the token for the currently logged in user client
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch(error) {
    res.status(500).send()
  }
})

router.post('/logout/all', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch(error) {
    res.status(500).send()
  }
})

module.exports = router