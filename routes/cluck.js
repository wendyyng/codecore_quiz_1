const express = require('express');
const knex = require('../db/client');
const router = express.Router()
const {relativeDate} = require('../public/js/date')
const {trending} = require('../public/js/trending')

//Index page
let indexPage = ['/', '/clucks']
router.get(indexPage, (req, res) => {
  let trends
    knex('clucks')
    .orderBy("createdAt", 'desc')
    .then(clucks => {
      knex('trending')
      .select('*')
      .orderBy('counter', 'desc')
      .returning('*')
      .then((tag) => {
        trends = tag
        res.render("index", {clucks: clucks, relativeDate:relativeDate, trends: trends})
      })
      
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
    let trends = trending(req.body.content)
    for(let each of trends){
      knex('trending')
      .select('*')
      .where('trend', 'like', each)
      .then((tag) => {
        if(tag.length === 0){
          knex('trending')
          .insert({
            trend: each,
            counter: 1
          })
          .returning("*")
          .then(() => {
            console.log("New trend added") 
          })
        }else{
          let count = parseInt(tag[0].counter) + 1
          console.log(typeof count)
          knex('trending')
          .where('trend', 'ilike', each)
          .update({
            counter: count
          })
          .returning('*')
          .then(() => {
            console.log("Trend increments by one") 
          
          })
        }
      })
    }
    // console.log(req.body)
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