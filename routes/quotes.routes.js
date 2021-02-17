const express = require('express')
const router = express.Router()

let QuoteModel = require('../models/Quote.model')
// const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn


router.get('/quotes', (req, res) => {
     console.log("this is quotes req:", req)
  QuoteModel.find()
          .then((quotes) => {
               res.status(200).json(todos)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
     })          
})

router.post('/create', (req, res) => {  
    const {quote, author, category, image} = req.body;

    console.log("this is quotes req body:", req.body)

//     const ownerId = req.session.loggedInUser._id
//     ownerId: ownerId
    QuoteModel.create({quote: quote, author: author, category: category, image: image })
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

router.get('/quotes/:myId', (req, res) => {
  QuoteModel.findById(req.params.myId)
     .then((response) => {
          res.status(200).json(response)
     })
     .catch((err) => {
          res.status(500).json({
               error: 'Something went wrong',
               message: err
          })
     }) 
})

router.delete('/quotes/:id', (req, res) => {
  QuoteModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

router.patch('/quotes/:id', (req, res) => {
    let id = req.params.id
    const {quote, author, category} = req.body;
    QuoteModel.findByIdAndUpdate(id, {$set: {quote: quote, author: author, category: category}})
          .then((response) => {
               res.status(200).json(response)
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

// router.get("/user", (req, res, next) => {
//      res.status(200).json(req.session);
// });

module.exports = router;