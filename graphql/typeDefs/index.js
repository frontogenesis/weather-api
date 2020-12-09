const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        _:String!
        hello: String!
        warnings(data: Geography!): [WarningType!]!
    }

    type Mutation {
        _:String!

    }

    type Subscription {
        _:String!
    }

    input Geography {
        state: String
        point: Point
    }

    input Point {
        lat: Float!
        lon: Float!
    }

    type WarningType {
        id: ID!
        properties: WarningPropertyType!
    }

    type WarningPropertyType {
        onset: String
        ends: String
        areaDesc: String
        event: String!
        severity: String
        certainty: String
        urgency: String
        headline: String
        description: String
        instruction: String
        response: String
    }
`

module.exports = typeDefs