const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.get('/test', (req, res) => {
    res.send('Hello World from router file')
})

//* POST Create Users

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//* READ All Users

router.get('/users', async(req, res) => {
    try {
        const users = await User.find()
        return res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//* READ single User

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {

            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Update User 
router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    if (!updates.every((update) => allowedUpdates.includes(update))) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//* Delete User
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.send(user + ' deleted')
    } catch (e) {
        res.status(404).send(e)
    }
})



module.exports = router