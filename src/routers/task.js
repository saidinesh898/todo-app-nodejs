const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

//* POST Create Tasks 

router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

//* READ All Tasks

router.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


//* READ single Task

router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



//*Update Task
router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    if (!updates.every((updates) => allowedUpdates.includes(updates))) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//* Delete Task
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task + ' deleted')
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router