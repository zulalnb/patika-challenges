import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { events, locations, users } from "./data.js";

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Query {
    # User
    users: [User!]!
    user(id: ID!): User!

    # Event
    events: [Event!]!
    event(id: ID!): Event!

    # Location
    locations: [Location!]!
  }
`;

const resolvers = {
  Query: {
    // user
    users: () => users,
    user: (parent, args) =>
      users.find((user) => user.id.toString() === args.id),

    // event
    events: () => events,
    event: (parent, args) =>
      events.find((event) => event.id.toString() === args.id),

    // location
    locations: () => locations,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
