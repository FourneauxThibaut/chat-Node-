const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 *  Database User schema
**/
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export schema
module.exports = mongoose.model('User', UserSchema);