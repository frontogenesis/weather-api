const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        alerts(data: Geography!): [WarningType!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): AuthPayload!
        login(data: LoginUserInput!): AuthPayload!
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

    type AuthPayload {
        token: String!
        user: User!
    }

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginUserInput {
        email: String!
        password: String!
    }

    type User {
        id: ID!
        name: String!
        email: String
        updatedAt: String!
        createdAt: String!
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