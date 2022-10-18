# Flyweight Pattern

**Rules** : `The flyweight pattern` is a useful way to conserve memory when we're creating a large number of similar objects.
`The flyweight pattern` is useful when you're creating a huge number of objects, which could potentially drain all available **RAM**. It allows us to minimize the amount of consumed memory.

### Example

```js
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map();

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};
```

In the example, we will not create new book if we has exact same book. If a book has the same ISBN number, thus is the exact same book type, we don't want to create an entirely new Book instance.
If it doesn't contain the book's ISBN number yet, we'll create a new book and add its ISBN number to the isbnNumbers set.

***Nowadays***, hardware has GBs of RAM, which makes the flyweight pattern `less important`.