const axios = require('axios')

const resolvers = {
    Query: {
        hello() {
            return 'Hello world test!'
      },
        async warnings(parent, { state }, ctx, info) {
            try {
                const warnings = await axios.get(`https://api.weather.gov/alerts/active?area=${state.toUpperCase()}`)
                return warnings.data.features
            } catch {
                throw new Error('Server error')
            }
      }
    },
}

module.exports = resolvers