const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch(error) {
    res.status(500).send()
  }
})

router.get('/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    !user ? res.status(404).send() : res.send(user)
  } catch(error) {
    res.status(500).send()
  }
})

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }

  try {
    const user = await User.findById(req.params.id)
    updates.forEach(update => user[update] = req.body[update])
    await user.save()
    !user ? res.status(404).send() : res.send(user)
  } catch(error) {
    res.status(400).send()
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    !user ? res.status(404).send() : res.send(user)
  } catch(error) {
    res.status(500).send()
  }
})

router.post('/', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch(error) {
    res.status(400).send(error.message)
  }
})

module.exports = router