const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

//* POST Create Tasks 

router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

//* READ All Tasks

router.get('/tasks/', auth, async(req, res) => {
    const match = {}
    const sort = {}

    if (req.query.statuis) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }


    try {
        const task = await Task.find({ owner: req.user._id })
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


//* READ single Task

router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send("No task found")
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



//*Update Task
router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'status']
    if (!updates.every((updates) => allowedUpdates.includes(updates))) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
})


//* Delete Task
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task + ' deleted')
    } catch (e) {
        res.status(404).send(e)
    }
})



module.exports = router