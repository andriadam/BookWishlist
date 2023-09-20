import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BooksList from '../components/home/BookList';
import BooksCard from '../components/home/BooksCard';
import { FcLike } from 'react-icons/fc';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      // console.log(response);
      // Mapping the API response to a structure similar to books
      const books = response.data.items.map((item) => ({
        title: item.volumeInfo.title,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(', ')
          : '',
        rating: item.volumeInfo.averageRating || 0,
        ratingsCount: item.volumeInfo.ratingsCount || 0,
      }));
      setSearchResults(books);
      setLoading(false);
    } catch (error) {
      console.error('Error searching books:', error);
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <div className="flex justify-end">
        <Link to={`/wishlist`} className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-center flex items-center'>
          <FcLike className='text-2xl text-red-600 hover:text-black' />
          <span className='ml-2'>Wishlist</span>
        </Link>
      </div>

      <div className="flex text-center justify-center">
        <div className="flex w-[50%]">
          <input
            type="text"
            placeholder="Search for books..."
            autoComplete="on"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-l-lg p-2 w-full"
            onKeyUp={handleKeyPress}
            autoFocus
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Search
          </button>
        </div>

      </div>

      {searchResults.length !== 0 && (
        <>
          <div className='flex justify-center items-center'>
            <h1 className='text-3xl my-8'>All Books</h1>
          </div>
          <div className='flex justify-center items-center gap-x-4'>
            <button
              className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
              onClick={() => setShowType('card')}
            >
              Card
            </button>
            <button
              className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
              onClick={() => setShowType('table')}
            >
              Table
            </button>
          </div>
        </>
      )}

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : showType === 'table' ? (
        <BooksList books={searchResults} canLiked={true} />
      ) : (
        <BooksCard books={searchResults} canLiked={true} />
      )}
    </div>
  );
};

export default Home;
