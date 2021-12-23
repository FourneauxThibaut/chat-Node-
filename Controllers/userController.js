const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * User controller
 */

// Get a list of all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        // notifier l'utilisateur d'une erreur, et définir un comportement pour l'app
    }
}

// Session management
exports.getSessionUser = async (req, res, next)=>{
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
    next();
}

exports.destroySessionUser = async (req, res, next)=>{
req.session.destroy();
res.send({loggedIn: false});
    next();
}

exports.authUser = async (req, res) => {
    const username = req.params.username;
    try {
        await User.findOne({username: username},(err, doc)=>{
            if(err) throw err;
            if(!doc){
                res.status(403).json({
                    message: 'The user is not register.'
                });
                console.log('The user is not register.');
            }else{
                bcrypt.compare(req.body.password, doc.password, function(err, result) {
                    if(result){
                    console.log('you are logged in as ' + doc.username);
                    req.session.user = doc;
                    res.status(200).json(
                        {loggedIn: true,message: "Login Successfuly!" , user: req.session.user}
                    );
                    }else if(err){
                        res.status(403).json({
                            message: 'incorrect password.'
                        });
                        console.log('incorrect password ' + user.password);
                    }
                });

            }
        });

    } catch (error) {
        console.log(error);
        // notifier l'utilisateur d'une erreur, et définir un comportement pour l'app
    }
}
exports.getUserByID = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findOne({_id: id},(err, doc)=>{
            if(err) throw err;
            if(!doc){
                console.log('User not found');
                res.send({message: 'User not found!'})
            }else{
                console.log(req.doc);
                res.json(doc);
            }      
        });

    } catch (error) {
        console.log(error);
        // notifier l'utilisateur d'une erreur, et définir un comportement pour l'app
    }
}

// Create a new user
exports.postUser = (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username: username, email: email, password: password });
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            
            try {
                user.save();
                // Success behaviour TBD
            } catch (error) {
                console.log(error);
                // Error behaviour TBD
            }
        });
    });
}

exports.putEditUser = (req, res) => {
    const userId = req.params.userId;
    const { username, email, password } = req.body;
    User.findById(userId)
    .then((user) => {
        user.username = username;
        user.email = email;
        user.password = password;
    
        user.save();
        })
        .then(() => {
            console.log('User Updated');
            // Success behaviour TBD
        })
        .catch((err) => {
            console.log(err);
            // Error behaviour TBD
        });
}

// Delete a user according to its ID
exports.postDeleteUser = async (req, res) => {
    // TBD
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(userId, (user) => user);
        res.sendStatus(200);
        // Success behaviour TBD
    } catch (error) {
        console.log(error);
        // Error behaviour TBD
    }
}