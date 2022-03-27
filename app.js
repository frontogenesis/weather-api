require('dotenv').config()
const createError = require('http-errors')
const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
const exphbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const weatherstemRouter = require('./routes/weatherstem')
const alertsRouter = require('./routes/alerts')
const forecastsRouter = require('./routes/forecasts')
const geoRouter = require('./routes/geo')
const stripeRouter = require('./routes/stripe')


const app = express()

// Allow cross-origin requests
app.use(cors())

app.engine('handlebars', exphbs({ defaultLayout: 'layout' }))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Express Router Middleware
app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/weatherstem', weatherstemRouter)
app.use('/alerts', alertsRouter)
app.use('/forecasts', forecastsRouter)
app.use('/geo', geoRouter)
app.use('/stripe', stripeRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports.handler = serverless(app)