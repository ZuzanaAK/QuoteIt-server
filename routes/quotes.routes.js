const express = require('express')
const router = express.Router()

let QuoteModel = require('../models/Quote.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn


router.get('/quotes', (req, res) => {
     QuoteModel.find()
          .then((quotes) => {
               console.log(quotes)
               res.status(200).json(quotes)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
     })          
})

//create a new quote

router.post('/create', isLoggedIn, (req, res) => {  
    const {quote, author, category} = req.body;

     let ownerId = req.session.loggedInUser._id

    QuoteModel.create({quote: quote, author: author, category: category, ownerId: ownerId})
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

router.get('/quotes/:quoteId', (req, res) => {

     QuoteModel.findById(req.params.quoteId)
     .then((response) => {
          console.log("I AM IN QUOTE ID")
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
// // console.log("USER ID IN USER QUOTES", req.session.loggedInUser._id)
  QuoteModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               console.log("WE ARE IN SIDE THEN BLOCK OF DELETE")
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          })  
})

router.patch('/quotes/:id', isLoggedIn, (req, res) => {
    let id = req.params.id
    const {quote, author, category} = req.body;
  
    QuoteModel.findByIdAndUpdate(id, {$set: {quote: quote, author: author, category: category}})
          .then((response) => {
               res.status(200).json(response)
               console.log("THIS IS THE RESPONSE OF PATCH")
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong',
                    message: err
               })
          }) 
})

//user quotes
router.get("/user-quotes", (req, res) => {

     console.log("USER ID IN USER QUOTES", req.session.loggedInUser._id)
      
     QuoteModel.find( {ownerId:req.session.loggedInUser._id}) 
     .then((quotes) => {
          res.status(200).json(quotes);
          console.log("QUOTES ARE", quotes)
          })
     .catch((err) => {
          res.status(500).json({
               error: "Something went wrong",
               message: err,
          });
     });
});


   

router.get("/user", isLoggedIn, (req, res, next) => {
     res.status(200).json(req.session.loggedInUser);
});

module.exports = router;