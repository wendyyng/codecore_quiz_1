const express = require('express');
const knex = require('../db/client');
const router = express.Router()

//Index page
router.get('/', (req, res) => {
    knex('clucks')
  //   .where('username', res.locals.username)
    .orderBy("updatedAt", 'desc')
    .then(clucks => {
      res.render("index", {clucks: clucks})
    })
  })

//Render new cluck form
router.get('/form', (req, res) => {
    let username = req.cookies.username;
    res.render('form', {username: username}) 
  })

  

module.exports = router;