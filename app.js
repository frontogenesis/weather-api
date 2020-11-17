const createError = require('http-errors')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const expressPlayground = require('graphql-playground-middleware-express').default
const schema = require('./schema')
const hbs = require('hbs')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const weatherstemRouter = require('./routes/weatherstem')
const alertsRouter = require('./routes/alerts')
const forecastsRouter = require('./routes/forecasts')
const geoRouter = require('./routes/geo')

const app = express()

// HANDLEBARS - view engine setup
hbs.registerPartials(__dirname + '/views/partials')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
  schema
}))
// Use GraphQL Playground
app.get('/playground', expressPlayground({ endpoint: '/graphql'}))

// Express Router Middleware
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/weatherstem', weatherstemRouter)
app.use('/alerts', alertsRouter)
app.use('/forecasts', forecastsRouter)
app.use('/geo', geoRouter)

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
});

module.exports = app