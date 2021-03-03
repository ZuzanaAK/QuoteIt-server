const isLoggedIn = (req, res, next) => {
  console.log('My Middleware', req.session)  
  if (req.session.loggedInUser) {
      console.log("this is inside middleware")
      //calls whatever is to be executed after the isLoggedIn function is over
      next()
  }
  else {
      res.status(401).json({
          message: 'Unauthorized user',
          code: 401,
      })
  };
};

module.exports = {
    isLoggedIn,
}