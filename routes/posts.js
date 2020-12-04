const express = require('express')
const router = express.Router()

const Post = require('../models/post')

router.get('/', (req, res) => {
    Post.find({})
        .then(posts => res.send(posts))
        .catch(error => res.status(500).send())
})

router.get('/:id', (req, res) => {
    const _id = req.params.id

    Post.findById(_id)
        .then(post => {
            if (!post) {
                return res.status(404).send()
            }
            res.send(post)
        })
        .catch(error => res.status(500).send())
})

router.post('/', (req, res) => {
    const post = new Post(req.body)

    post.save()
        .then(() => res.status(201).send(post))
        .catch(error => res.status(400).send(error.message))
})

module.exports = router