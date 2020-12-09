const axios = require('axios')

const resolvers = {
    Query: {
        hello() {
            return 'Hello world test!'
      },
        async warnings(parent, { data }, ctx, info) {
            const alertsEndpoint = data.state ? 
            `https://api.weather.gov/alerts/active?area=${data.state.toUpperCase()}` : 
            `https://api.weather.gov/alerts/active?point=${data.point.lat},${data.point.lon}`

            try {
                const warnings = await axios.get(alertsEndpoint)
                return warnings.data.features
            } catch {
                throw new Error('Server error')
            }
      }
    },
}

module.exports = resolvers