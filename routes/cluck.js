const express = require('express');
const knex = require('../db/client');
const router = express.Router()

const trending = (content) => {
  let trends = []
  let regex = /#[a-zA-Z0-9_]+/
  if(content.includes("#")){
      let words = content.split(" ")
      for(let each of words){
          if(regex.test(each)) trends.push(each)
      }
  }
  return trends
}

// Example date: 2022-07-05 19:10:31.80691+00
// let current = new Date()
const relativeDate = (currentTime, createdDate) => {

  let timediff = currentTime.getTime() - Date.parse(createdDate)
  let days = Math.floor(timediff / (1000 * 60 * 60 * 24));
  timediff -= days * (1000 * 60 * 60 * 24);
  // console.log(timediff)

  let hours = Math.floor(timediff / (1000 * 60 * 60));
  timediff -= hours * (1000 * 60 * 60);

  let mins = Math.floor(timediff / (1000 * 60));
  timediff -= mins * (1000 * 60);
 
  let secs = Math.floor(timediff / (1000));
  timediff -= secs * 1000;

  // console.log(timediff)

  if(days === 0 && hours === 0 && mins === 0 && secs >= 0){
      return "Just Now"
  }else if(days === 0 && hours === 0 && mins >= 1){
    if(mins === 1){
      return `${mins} minute ago` 
    }else{
      return `${mins} minutes ago`
    }
  }else if(days === 0 && hours > 0){
    if(hours === 1){
      return `${hours} hour ago` 
    }else{
      return `${hours} hours ago`
    }
  }else{
    if(days === 1){
      return `${days} day ago` 
    }else{
      return `${days} days ago`
    }
  }
}

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
    console.log(req.body.content)
    console.log(typeof req.body.content)
    let trends = trending(req.body.content)
    for(let each of trends){
      knex('trending')
      .select('*')
      .where('trend', 'like', each)
      .then((tag) => {
        // console.log(tag)
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
          console.log(tag[0].counter)
          let count = parseInt(tag[0].counter) + 1
          // console.log(typeof count)
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