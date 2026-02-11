import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { users } from "./data.js";

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => {
      return users.find((user) => user.id.toString() === args.id);
    },
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
