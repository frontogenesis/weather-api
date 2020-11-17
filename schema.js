const axios = require('axios')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
 } = require('graphql')

// Warning Type
const WarningType = new GraphQLObjectType({
    name: 'Warning',
    fields() {
        return {
            id: { type: GraphQLString },
            properties: { type: WarningPropertyType }
        }
    }
})

const WarningPropertyType = new GraphQLObjectType({
    name: 'WarningProperties',
    fields() {
        return {
            onset: { type: GraphQLString },
            ends: { type: GraphQLString },
            event: { type: GraphQLString },
            severity: { type: GraphQLString },
            certainty: { type: GraphQLString },
            urgency: { type: GraphQLString },
            headline: { type: GraphQLString },
            description: { type: GraphQLString },
            instruction: { type: GraphQLString },
            response: {type: GraphQLString }
        }
    }
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      warnings: {
        type: new GraphQLList(WarningType),
        resolve(parent, args) {
            return axios.get('https://api.weather.gov/alerts/active?area=FL')
                .then(res => res.data.features)
        }
      }
  }  
})

module.exports = new GraphQLSchema({
    query: RootQuery
}) 