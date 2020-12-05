const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const Post = require('../models/post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)
        !post ? res.status(404).send() : res.send(post)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates' })
    }

    try {
        const post = await Post.findById(req.params.id)
        updates.forEach(update => post[update] = req.body[update])
        await post.save()
        !post ? res.status(404).send() : res.send(post)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        !post ? res.status(404).send() : res.send(post)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/', auth, async (req, res) => {
    const post = new Post({
        ...req.body,
        author: req.user._id
    })

    try {
        await post.save()
        res.status(201).send(post)
    } catch(error) {
        res.status(400).send(error.message)
    }
})

module.exports = router