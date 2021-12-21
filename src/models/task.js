const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task