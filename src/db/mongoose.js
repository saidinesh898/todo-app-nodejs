require('dotenv').config()


const mongoose = require('mongoose');
try {
    mongoose.connect(process.env.MONGODB_REMOTE, {
        useNewUrlParser: true,
    })
} catch (e) {
    console.log('Error connecting to database', e)
}