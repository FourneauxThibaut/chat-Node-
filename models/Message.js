const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 *  Database Message schema
**/
const MessageSchema = new Schema({
    room: [{
        type : Schema.Types.ObjectId,
        ref : "Room"
    }],
    //// room: roomSchema, 
    user: [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    //// user: [UserSchema],
    message_body: String,
    created_at: Date,
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

// Export schema
module.exports = mongoose.model('Message', MessageSchema);