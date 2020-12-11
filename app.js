const createError = require('http-errors')
const express = require('express')
require('./db/mongoose')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const cors = require('cors')
const hbs = require('hbs')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const weatherstemRouter = require('./routes/weatherstem')
const alertsRouter = require('./routes/alerts')
const forecastsRouter = require('./routes/forecasts')
const geoRouter = require('./routes/geo')

const db = require('./models')
const authMiddleware = require('./middleware/auth')

const app = express()

// Allow cross-origin requests
app.use(cors())

// HANDLEBARS - view engine setup
hbs.registerPartials(__dirname + '/views/partials')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

//app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Apollo Server GraphQL
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { 
    db, 
  },
  introspection: true,
  playground: true
})

server.applyMiddleware({ app, authMiddleware })
app.get('/playground', (_, res) => res.redirect('/graphql'))

// Express Router Middleware
app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
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
})

module.exports = app