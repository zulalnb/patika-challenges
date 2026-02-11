export const authors = [
  {
    id: "1",
    name: "Albert",
    surname: "Camus",
    age: 50,
    books: [
      {
        id: "1",
        title: "Yabancı",
        score: 6.9,
        isPublished: true,
      },
      {
        id: "2",
        title: "Sisifos Söyleni",
        score: 6.9,
        isPublished: true,
      },
    ],
  },
  {
    id: "2",
    name: "Paul",
    surname: "Sartre",
    age: 50,
  },
];

export const books = [
  {
    id: "1",
    title: "Yabancı",
    author: authors[0],
    score: 6.9,
    isPublished: true,
  },
  {
    id: "2",
    title: "Sisifos Söyleni",
    author: authors[0],
    score: 6,
    isPublished: true,
  },
];
