const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 80

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.get("/", (req, res) => {
    res.status(400).send("No Content Here Use API")

})

const jwt = require('jsonwebtoken')
const myFunction = async() => {
    100
    const token = jwt.sign({ _id: 'abc123' }, 'thisismysecret', { expiresIn: '1 year' })
    try {
        console.log(jwt.verify(token, 'thisismysecret'))
    } catch (e) {
        console.log("invalid token")
    }

}
myFunction()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})