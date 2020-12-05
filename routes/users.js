const express = require('express')
const router = express.Router()
const auth = require ('../middleware/auth')

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
    res.send(req.user)
  } catch(error) {
    res.status(500).send()
  }
})

router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    const token = await user.generateAuthToken()
    await user.save()
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