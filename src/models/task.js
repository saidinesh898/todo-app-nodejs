const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length <= 3) {
                throw new Error('Description must be more than 3 characters')
            }
        }
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = Task