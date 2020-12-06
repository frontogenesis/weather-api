const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const Post = require('../models/post')

router.get('/', auth, async (req, res) => {
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 0
    }

    try {
        await req.user.populate({
            path: 'posts',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.posts)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findOne({ _id, author: req.user._id })
        !post ? res.status(404).send() : res.send(post)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates' })
    }

    try {
        const post = await Post.findOne({ _id: req.params.id, author: req.user._id })

        if (!post) {
            res.status(404).send()
        }

        updates.forEach(update => post[update] = req.body[update])
        await post.save()
        res.send(post)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id })
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