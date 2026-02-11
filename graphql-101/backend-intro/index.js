import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authors, books } from "./data.js";

const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
    surname: String
    age: Int
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    author_id: String!
    score: Float
    isPublished: Boolean
  }

  type Query {
    books: [Book!]
    book(id: ID!): Book!

    authors: [Author!]
    author(id: ID!): Author!
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find((book) => book.id === args.id),

    authors: () => authors,
    author: (parent, args) => authors.find((author) => author.id === args.id),
  },
  Book: {
    author: (parent) =>
      authors.find((author) => author.id === parent.author_id),
  },
  Author: {
    books: (parent) => books.filter((book) => book.author_id === parent.id),
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
