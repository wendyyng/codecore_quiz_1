const express = require('express');
const knex = require('../db/client');
const router = express.Router()
const {relativeDate} = require('../public/js/date')

//Sign in page
router.get('/home', (req, res) => {
    let username = req.cookies.username;
    res.render('home', {username: username}) 
  })

//Index page
router.get('/', (req, res) => {
    knex('clucks')
    .orderBy("createdAt", 'desc')
    .then(clucks => {
        let time = []
        for(let each of clucks){
            time.push(relativeDate(each.createdAt))
        }
      res.render("index", {clucks: clucks, relativeTime: time, relativeDate:relativeDate})
    })
  })

  router.get('/clucks', (req, res) => {
    knex('clucks')
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