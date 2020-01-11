import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getFilter(
      name: String
      city: String
      date: String
      limit: Int
      skip: Int
      concerts: [String]
    ): [Concert]!
  }

  type Concert {
    id: ID!
    city: String!
    name: String!
    description: String
    concerts: [Concerts]
  }
`;
