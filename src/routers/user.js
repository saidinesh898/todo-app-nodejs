const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/avatars')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const avatar = multer({ storage: storage })

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



//* READ My Profile Users

router.get('/users/me', auth, async(req, res) => {
    try {
        return res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//* Logout User
router.post('/users/logout', auth, async(req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {

                return token.token !== req.token
            })
            await req.user.save()

            res.send()

        } catch (e) {
            res.status(500).send()
        }
    })
    //* Logout  All Session 
router.post('/users/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



//* Update User 
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    if (!updates.every((update) => allowedUpdates.includes(update))) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//* Delete User
router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user + ' deleted')
    } catch (e) {
        res.status(404).send(e)
    }
})

const errorMiddleware = (req, res, next) => {
    throw new Error('From my middleware')
}


//* Upload Image

router.post('/users/me/avatar', auth, avatar.single('avatar'), (req, res) => {
    res.send('ok')
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })

})

module.exports = router