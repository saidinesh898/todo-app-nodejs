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


app.get("/", (req, res) => {
    res.status(400).send("No Content Here Use API")

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})