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