const axios = require('axios')
const User = require('../../models/user')

const baseUrl = 'https://api.weather.gov/alerts/active?'

const resolvers = {
    Query: {
        async alerts(parent, { data }, ctx, info) {
            const alertsEndpoint = data.state ? `${baseUrl}area=${data.state.toUpperCase()}` : 
            `${baseUrl}point=${data.point.lat},${data.point.lon}`

            try {
                const warnings = await axios.get(alertsEndpoint)
                return warnings.data.features
            } catch {
                throw new Error('Server error')
            }
        },
    },
    Mutation: {
        async createUser(parent, args, ctx, info) {
            let user = new User(args.data)

            try {
                user = await user.save()
                const token = await user.generateAuthToken()
                return { user, token }
            } catch(error) {
                throw new Error(error)
            }
        }
    }
}

module.exports = resolvers