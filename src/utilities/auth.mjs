
function isLoggedIn (req, res, next) {
  console.log(req.token, req.token.id)
  if (req.token && req.token.id) {
    next()
  } else {
    res.sendStatus(401)
  }
  // has token
  // token contains user id
  // token is not expired
}

function ownsRequestedProduct (req, res, next) {
  return true // such a middleware can be used as a "paywall"
}

export {
  isLoggedIn,
  ownsRequestedProduct
}
