const express = require("express")
const routes = express.Router()

routes.get("/", (req, res)=> {                                  //index
    res.render('users/index', {text: 'userlist'})
})

routes.get("/edit/:id", (req, res)=> {                          //edit
    res.render('users/edit', {id: '$req.params.id'})
})

routes.get('/:id', (req, res)=> {                               //show
    res.render('users/show', {id: '$req.params.id'})    
})

routes.put((req, res)=> {                                       //update
        res.send('Update USer With ID $req.params.id')
})

routes.delete((req, res)=> {                                    //delete
        res.send('Delete USer With ID $req.params.id')
})

routes.param('id', (req,res, next, id)=> {
    next()
})

module.exports = routes