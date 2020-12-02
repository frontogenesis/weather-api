const { ApiRequest } = require('./fetch')

const weatherStemMiddleware = async (req, _, next) => {
  const weatherstem = new ApiRequest('https://cdn.weatherstem.com/dashboard/data/dynamic/dashboard.json')

  try {
    const data = await weatherstem.get()
    req.data = data

  } catch(error) {
    console.log(error)
  }

  next()
}

module.exports = { weatherStemMiddleware }