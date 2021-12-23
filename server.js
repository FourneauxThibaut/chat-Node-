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

// const database = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_DB}.zbjgu.mongodb.net/ChatDatabase?retryWrites=true&w=majority`
// mongodb+srv://MtKuma:<password>@mtkuma.ufwu9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const database = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_DB}.ufwu9.mongodb.net/ChatDatabase?retryWrites=true&w=majority`
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

const User = require("./models/User")

mongoose.connect(database, {
    user: MONGO_USER,
    pass: MONGO_PW,
    authSource: "admin",
    useNewUrlParser: true
  })
  .then(
    () => { console.log('Database is connected') })
  .catch((err) => {
      console.log(err);
  });

run()
// print all users
async function run() {
  try{
    const user = await User.where("email")
    console.log(user);
  }catch (e){
    console.log(e.message);
  }
}

// create an user
async function run() {
    const user = await User.create({
      username: "specialname",
      email: "name@mail.com",
      password: "pass123"
    })
}