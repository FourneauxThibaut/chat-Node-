const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 *  Database Room schema
**/
const RoomSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    message: [{
        type : Schema.Types.ObjectId,
        ref : "Message"
    }],
    //// message: [messageSchema],
    created_at: Date,
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

// Export schema
module.exports = mongoose.model('Room', RoomSchema);