const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const auth = require('./middleware/auth')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 80

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.get("*", (req, res) => {
    res.status(404).send(
        `<h1>404</h1>
        <h2>Page not found</h2>`
    )

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const Task = require('./models/task')
const User = require('./models/user')

// const main = async() => {

//     // const task = await Task.findById('61c05fd9ceb47fa925dd76e2')
//     // await task.populate('owner')
//     // console.log(task.owner)
//     const user = await User.findById('61c05ef007fbb698147cb633')
//     await user.populate('tasks')
//     console.log(user.tasks)

// }
// main()