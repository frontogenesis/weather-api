const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(error => res.status(500).send())
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  
  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  }).catch(e => res.status(500).send())
})

router.post('/', (req, res) => {
  const user = new User(req.body)

  user.save()
    .then(() => res.status(201).send(user))
    .catch(error => res.status(400).send(error.message))
})

module.exports = router
