const express = require('express');
const knex = require('../db/client');
const router = express.Router()
const {relativeDate} = require('../public/js/date')
// const {trending} = require('../public/js/trending')



//Index page
let indexPage = ['/', '/clucks']
router.get(indexPage, (req, res) => {
  let trends = false
    knex('clucks')
    .orderBy("createdAt", 'desc')
    .then(clucks => {
        let time = []
        for(let each of clucks){
            time.push(relativeDate(each.createdAt))
        }
      res.render("index", {clucks: clucks, relativeTime: time, relativeDate:relativeDate, trends: trends})
    })
  })

  // router.get('/clucks', (req, res) => {
  //   knex('clucks')
  //   .orderBy("createdAt", 'desc')
  //   .then(clucks => {
  //     res.render("index", {clucks: clucks})
  //   })
  // })
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