import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    score: Float
    isPublished: Boolean
  }

  type Query {
    book: [Book!]!
  }
`;

const resolvers = {
  Query: {
    book: () => {
      return [
        {
          id: "msys6w67w",
          title: "Yabancı",
          author: "Albert Camus",
          score: 6.9,
          isPublished: true,
        },
      ];
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

console.log(`🚀Apollo Server is up at: ${url}`);
