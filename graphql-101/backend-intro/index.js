import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const author = {
  id: "1",
  name: "Albert",
  surname: "Camus",
  age: 50,
  books: [
    {
      id: "msys6w67w",
      title: "Yabancı",
      score: 6.9,
      isPublished: true,
    },
    {
      id: "msys6w67t",
      title: "Sisifos Söyleni",
      score: 6.9,
      isPublished: true,
    },
  ],
};

const book = {
  id: "msys6w67w",
  title: "Yabancı",
  author,
  score: 6.9,
  isPublished: true,
};

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
    author: Author
    score: Float
    isPublished: Boolean
  }

  type Query {
    book: Book
    author: Author
  }
`;

const resolvers = {
  Query: {
    book: () => book,
    author: () => author,
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
