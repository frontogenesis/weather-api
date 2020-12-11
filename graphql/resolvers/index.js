const axios = require('axios')

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
        async createUser(parent, args, { db: { User } }, info) {
            const user = new User(args.data)

            try {
                await user.save()
                const token = await user.generateAuthToken()
                return { user, token }
            } catch(error) {
                throw new Error(error)
            }
        },
        async login(parent, args, { db: { User }}, info) {
            try {
                const user = await User.findByCredentials(args.data.email, args.data.password)
                const token = await user.generateAuthToken()
                return { user, token }
            } catch {
                throw new Error('Unable to login')
            }
        }
    }
}

module.exports = resolvers