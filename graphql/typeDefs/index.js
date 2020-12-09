const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        _:String!
        hello: String!
        warnings: [WarningType!]!
    }

    type Mutation {
        _:String!

    }

    type Subscription {
        _:String!
    }

    type WarningType {
        id: ID!
        properties: WarningPropertyType!
    }

    type WarningPropertyType {
        onset: String!
        ends: String!
        event: String!
        severity: String!
        certainty: String!
        urgency: String!
        headline: String!
        description: String!
        instruction: String!
        response: String!
    }
`

module.exports = typeDefs