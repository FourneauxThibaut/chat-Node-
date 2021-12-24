
// hashing password :   https://stackoverflow.com/questions/14588032/mongoose-password-hashing
//                      https://stackfame.com/mongodb-chat-schema-mongoose-chat-schema-chat-application

module.exports = mongoose.model('User', UserSchema);

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
// module.exports = mongoose.model('User', UserSchema);
// const userSchema = new mongoose.Schema({
//     username: { type: String, lowercase: true, unique: true },
//     email: { type: String, lowercase: true, unique: true },
//     password: String,     
//     is_active: { type: Boolean, default: false },
// })

const messageSchema = new mongoose.Schema({    
    room: roomSchema, 
    users: [userSchema],        
    message_body: String,    
    message_status:{type: Boolean, default: false},    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

const roomSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },    
    users: [userSchema],    
    messages: [messageSchema],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
})

var User = mongoose.model('User', userSchema);

// const User1 = new User({ username: 'sarasodou', email: 'sd-famillia@hotmail.com' });
// User1.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

var Message = mongoose.model('Message', messageSchema);

// const Message1 = new Message({ room: Room1, users: User1, message_body: 'Hello' });
// Message1.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

var Room = mongoose.model('Room', roomSchema);

// const Room1 = new Room({ name: 'room1', users: User1, messages: Message1 });
// Room1.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });


// ! ajouter "status par message pour les notification (envoyer, vu etc..)"