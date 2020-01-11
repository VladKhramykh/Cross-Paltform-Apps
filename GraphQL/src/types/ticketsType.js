import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getTickets: [Ticket!]!
    getTicket(id: ID!): Ticket
  }

  type Ticket {
    userId: ID
    buildingId: ID
    concertId: ID
    placeId: ID
    additionalIds: ID
    id: ID!
  }

  type Mutation {
    createTicket(
      userId: ID!
      buildingId: ID!
      concertId: ID!
      placeId: ID!
      additionalIds: [ID]
    ): Ticket
    updateTicket(
      id: ID!
      buildingId: ID
      concertId: ID
      placeId: ID
      additionalIds: ID
    ): Ticket!
    deleteTicket(id: ID!): String!
  }
`;
