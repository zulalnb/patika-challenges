import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    title: String!
    author: String!
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
          title: "Yabancı",
          author: "Albert Camus",
        },
        {
          title: "Deneme Kitap",
          author: "Deneme Yazar",
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
