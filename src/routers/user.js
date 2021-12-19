const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


//* POST Create Users

router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


//* Login User
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(401).send(e)
    }
})

router.post('/users/login')

//* READ My Profile

router.get('/users/me', auth, async(req, res) => {
    try {
        return res.send(req.user)
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
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
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