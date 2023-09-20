import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BooksList from '../components/home/BookList';
import BooksCard from '../components/home/BooksCard';
import BackButton from '../components/BackButton';

const Wishlist = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/wishlist')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className="flex justify-start">
        <BackButton destination='/' />
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Wishlist Book</h1>
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
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : showType === 'table' ? (
        <BooksList books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Wishlist;
