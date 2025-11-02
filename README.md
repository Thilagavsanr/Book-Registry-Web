# Book Registry Web

A modern web application for managing book records with a clean black and white aesthetic.

## Features

- 📚 View all registered books
- ➕ Add new books with title, author, and price
- 🔍 Search books by ID
- 💾 RESTful API endpoints (GET, POST)
- 🎨 Minimalist black and white design

## Technologies Used

- React 18
- Tailwind CSS
- Spring Boot (Backend API - simulated)
- H2 Database (In-memory)
- Spring Data JPA

## Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/book-registry-web.git

# Navigate to project directory
cd book-registry-web

# Install dependencies
npm install

# Start the development server
npm start
```

## API Endpoints

- `GET /api/books` - Retrieve all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Add a new book

## Usage

1. Use the "Add New Book" form to register new books
2. View all books in the main table
3. Search for specific books using the search feature

## License

MIT License
