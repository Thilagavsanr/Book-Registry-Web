import React, { useState, useEffect } from 'react';
import MockSpringBootAPI from './api/MockSpringBootAPI';

const api = new MockSpringBootAPI();

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: ''
  });
  const [searchId, setSearchId] = useState('');
  const [searchedBook, setSearchedBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await api.getAllBooks();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books from Spring Boot backend');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.author || !formData.price) {
      setError('All fields are required');
      return;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number');
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.addBook(formData);
      setSuccess(`Book "${response.data.title}" added successfully with ID: ${response.data.bookId}`);
      setFormData({ title: '', author: '', price: '' });
      await loadBooks();
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.message || 'Failed to add book');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError('');
    setSearchedBook(null);

    if (!searchId) {
      setSearchError('Please enter a book ID');
      return;
    }

    try {
      setSearching(true);
      const response = await api.getBookById(searchId);
      setSearchedBook(response.data);
    } catch (err) {
      setSearchError(err.message || 'Book not found');
    } finally {
      setSearching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-4 border-black p-8 mb-8">
          <h1 className="text-5xl font-bold text-black text-center">Book Registry Web</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <div className="border-4 border-black p-6">
              <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b-4 border-black">Add New Book</h2>
              
              {error && <div className="bg-gray-200 border-2 border-black text-black px-4 py-3 mb-4 font-medium">{error}</div>}
              {success && <div className="bg-gray-200 border-2 border-black text-black px-4 py-3 mb-4 font-medium">{success}</div>}

              <div className="space-y-4">
                <div>
                  <label className="block text-black font-bold mb-2">Book Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label className="block text-black font-bold mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label className="block text-black font-bold mb-2">Price (INR)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0.00"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-black text-white py-3 px-6 font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Adding...' : 'Add Book (POST /api/books)'}
                </button>
              </div>
            </div>

            <div className="border-4 border-black p-6">
              <h4 className="text-lg font-bold text-black mb-4">REST API Endpoints</h4>
              <div className="space-y-3">
                <div className="border-2 border-black px-4 py-3">
                  <span className="font-mono font-bold text-black mr-3">GET</span>
                  <span className="text-black">/api/books</span>
                </div>
                <div className="border-2 border-black px-4 py-3">
                  <span className="font-mono font-bold text-black mr-3">GET</span>
                  <span className="text-black">/api/books/{'{id}'}</span>
                </div>
                <div className="border-2 border-black px-4 py-3">
                  <span className="font-mono font-bold text-black mr-3">POST</span>
                  <span className="text-black">/api/books</span>
                </div>
              </div>
            </div>

            <div className="border-4 border-black p-6">
              <h4 className="text-lg font-bold text-black mb-4">Search Book by ID</h4>
              <div className="mb-3">
                <input
                  type="number"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter book ID"
                  min="1"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={searching}
                className="w-full bg-black text-white py-3 px-6 font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {searching ? 'Searching...' : 'Search (GET /api/books/id)'}
              </button>

              {searchError && (
                <div className="bg-gray-200 border-2 border-black text-black px-4 py-3 mt-4 font-medium">
                  {searchError}
                </div>
              )}

              {searchedBook && (
                <div className="border-2 border-black p-5 mt-4">
                  <h4 className="font-bold text-black mb-3 text-lg">Book Details:</h4>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="font-bold text-black w-24">ID:</span>
                      <span className="text-black">{searchedBook.bookId}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-black w-24">Title:</span>
                      <span className="text-black">{searchedBook.title}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-black w-24">Author:</span>
                      <span className="text-black">{searchedBook.author}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-black w-24">Price:</span>
                      <span className="text-black">₹{searchedBook.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="border-4 border-black p-6">
              <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-4 border-black">
                Book Collection ({books.length} books)
              </h2>
              <p className="text-gray-600 mb-6">Data from Spring Boot backend (H2 Database)</p>

              {loading ? (
                <div className="text-center py-12 text-black text-xl font-bold">
                  Loading from JPA Repository...
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-16 text-gray-600">
                  <h3 className="text-2xl font-bold mb-2">No Books Found</h3>
                  <p className="text-lg">Add your first book using the form!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border-2 border-black">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="px-6 py-4 text-left font-bold border-2 border-black">Book ID</th>
                        <th className="px-6 py-4 text-left font-bold border-2 border-black">Title</th>
                        <th className="px-6 py-4 text-left font-bold border-2 border-black">Author</th>
                        <th className="px-6 py-4 text-left font-bold border-2 border-black">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr key={book.bookId} className="hover:bg-gray-100 transition-colors">
                          <td className="px-6 py-4 text-black border-2 border-black">{book.bookId}</td>
                          <td className="px-6 py-4 font-bold text-black border-2 border-black">{book.title}</td>
                          <td className="px-6 py-4 text-black border-2 border-black">{book.author}</td>
                          <td className="px-6 py-4 font-bold text-black border-2 border-black">₹{book.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
