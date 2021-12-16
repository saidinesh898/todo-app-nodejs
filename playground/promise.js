require('../src/db/mongoose')
const { connection, Mongoose } = require('mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')


// User.findByIdAndUpdate('61a234a81a10f53c241ea9eb', { age: 23 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 23 })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

// task = Task.findByIdAndDelete('61a64f6eafab9f5fa66ee880').then((task) => {
//     console.log(task, "task is removed from database")
//     return Task.countDocuments({ completed: false }).then((count) => {
//         console.log(count, " of the Tasks  are incomplete ")
//     })
// }).catch((e) => {
//     console.log(e)
// })


// const updateAgeAndCount = async(id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age })
//     const count = await User.countDocuments({ age })
//     return { user, count }
// }

// updateAgeAndCount('61a234a81a10f53c241ea9eb', 23).then((data) => {
//     console.log(data)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return { task, count }
}

deleteTaskAndCount('61a67203afab9f5fa66ee881').then((data) => {
    console.log(data)
}).catch((e) => {
    console.log(e)
})