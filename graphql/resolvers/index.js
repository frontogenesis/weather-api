const axios = require('axios')

const resolvers = {
    Query: {
      hello() {
        return 'Hello world test!'
      },
      warnings(parent, args, ctx, info) {
        return axios.get('https://api.weather.gov/alerts/active?area=FL')
        .then(res => res.data.features)
      }
    },
}

module.exports = resolvers