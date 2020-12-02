const routeStatus = (req, res, next) => {
  const now = new Date().toString()
  console.log(`${now}: ${req.method} ${req.url}`)
  next()
}

module.exports = routeStatus