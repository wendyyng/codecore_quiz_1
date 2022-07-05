const express = require('express');
const knex = require('../db/client');
const router = express.Router()

//Sign in page
router.get('/home', (req, res) => {
    let username = req.cookies.username;
    res.render('home', {username: username}) 
  })

//Index page
router.get('/', (req, res) => {
    knex('clucks')
  //   .where('username', res.locals.username)
    .orderBy("createdAt", 'desc')
    .then(clucks => {
      res.render("index", {clucks: clucks})
    })
  })

//Render new cluck form
router.get('/form', (req, res) => {
    let username = req.cookies.username;
    res.render('form', {username: username}) 
  })

  //Create new cluck
router.post('/form', (req, res) => {
    let username = req.cookies.username;
    console.log(req.body)
    knex('clucks')
    .insert({
        username:username,
        image_url:req.body.image_url,
        content:req.body.content
    })
    .returning('*')
    .then((clucks) => {
        res.redirect('/')
    })
})

module.exports = router;