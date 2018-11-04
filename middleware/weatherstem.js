const { ApiRequest } = require('./fetch');

const weatherStemMiddleware = async (req, res, next) => {
  const weatherstem = new ApiRequest('https://cdn.weatherstem.com/orangestem/data/dynamic/orangestem.json');

  try {
    const data = await weatherstem.get();
    req.data = data;

  } catch(error) {
    console.log(error);
  }

  next();
};

module.exports = { weatherStemMiddleware };