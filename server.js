require('dotenv').config()

// env var
const MONGO_USER = process.env.DB_USER;
const MONGO_PW = process.env.DB_PASS;
const MONGO_DB = process.env.DB_HOST;

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_DB}.zbjgu.mongodb.net/ChatDatabase?retryWrites=true&w=majority`).then(
  () => { },
  err => { }
); 

//      ┌───────────────┐
//      │  Path access  │
//      └───────────────┘
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname + '/views') 
app.set('view engine', 'ejs')

//      ┌──────────┐
//      │  Router  │
//      └──────────┘
app.get('/', (req, res)=> {
  res.render('index', {text: 'world'})
})
app.get("/signup", (req, res)=> {                               //Sign up - createUser
  res.render('authentification/signup')
})
app.get("/signin", (req, res)=> {                               //Sign in - connectUser
  res.render('authentification/signin')
})

const userRoutes = require('./routes/users')
app.use('/users', userRoutes)

//      ┌──────────┐
//      │  Server  │
//      └──────────┘
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});