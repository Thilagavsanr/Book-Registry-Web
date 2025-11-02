class MockSpringBootAPI {
  constructor() {
    this.baseURL = '/api';
    this.books = [
      { bookId: 1, title: "Spring Boot in Action", author: "Craig Walls", price: 1299.00 },
      { bookId: 2, title: "Effective Java", author: "Joshua Bloch", price: 1499.00 },
      { bookId: 3, title: "Clean Code", author: "Robert C. Martin", price: 1350.00 }
    ];
    this.nextId = 4;
  }

  getAllBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: [...this.books] });
      }, 500);
    });
  }

  getBookById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = this.books.find(b => b.bookId === parseInt(id));
        if (book) {
          resolve({ data: book });
        } else {
          reject({ message: `Book with ID ${id} not found` });
        }
      }, 400);
    });
  }

  addBook(bookData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!bookData.title || !bookData.author || !bookData.price) {
          reject({ message: "All fields are required" });
          return;
        }

        const newBook = {
          bookId: this.nextId++,
          title: bookData.title,
          author: bookData.author,
          price: parseFloat(bookData.price)
        };

        this.books.push(newBook);
        resolve({ data: newBook });
      }, 400);
    });
  }
}

export default MockSpringBootAPI;
