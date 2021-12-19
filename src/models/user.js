const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//* Login Middleware 
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        return ('No User Found')

    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return ('Unable to login')

    }
    return user
}

//* Generate Token Middleware 

userSchema.methods.generateAuthToken = async function() {
    const user = this //* this is the user object
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

//* Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;