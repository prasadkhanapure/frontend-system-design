const data = {
  authors: [
    {
      id: 1,
      name: "Test User 1",
      bookIds: [101, 102],
    },
    {
      id: 2,
      name: "Test User 2",
      bookIds: [103, 104],
    },
  ],
  books: [
    {
      id: 101,
      title: "React",
      publishedYear: 2020,
      authorId: 1,
    },
    {
      id: 102,
      title: "Javascript",
      publishedYear: 2022,
      authorId: 1,
    },
    {
      id: 103,
      title: "Springboot",
      publishedYear: 2021,
      authorId: 2,
    },
    {
      id: 103,
      title: "Java",
      publishedYear: 2023,
      authorId: 2,
    },
  ],
};

export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      console.log(parent);
      return data.authors.find(
        (authDetail) => authDetail.id === parent.authorId,
      );
    },
  },
  Author: {
    books: (parent) => {
      return data.books.filter((bookDetails) =>
        parent.bookIds.includes(bookDetails.id)
      );
    },
  },
  Query: {
    authors: () => {
      return data.authors;
    },
    books: () => {
      return data.books;
    },
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      const insertedBook = { ...args, id: data.books.length + 1 };
      data.books.push(insertedBook);
      return insertedBook;
    },
  },
};
