import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
  }

  type User {
    firstName: String!
    lastName: String!
    hashPassword: String!
    settings: String
    role: String!
    id: ID!
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      hashPassword: String!
      role: String!
      settings: String
    ): User!
    updateUser(
      firstName: String!
      lastName: String!
      hashPassword: String!
      settings: String
      role: String!
    ): User!
    deleteUser(id: ID!): String!
  }
`;
