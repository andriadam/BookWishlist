import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const BookSingleCard = ({ book, canLiked }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlistClick = () => {
    setIsLiked(true);
    axios
      .post('http://localhost:5555/wishlist', book)
      .then((response) => {
        // console.log('Book added to wishlist:', response.data);
        enqueueSnackbar('Book added to wishlist', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error adding book to wishlist:', error);
      });
    setTimeout(() => {
      setIsLiked(false); // After 1 seconds, set "liked" to false
    }, 300);
  };


  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <div className="flex justify-center">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            className='h-96 w-64 object-cover'
            alt={book.title}
          />
        ) : (
          <div className='h-96 w-64 bg-gray-300 flex text-center items-center justify-center'>
            No Image
          </div>
        )}
      </div>
      <div className="description mt-3 mb-0">
        <div className='flex justify-start items-center gap-x-2 h-20'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1 text-lg font-semibold'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2 h-10'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.authors}</h2>
        </div>
        {book.rating !== 0 && book.ratingsCount !== 0 ? (
          <div className='flex justify-start items-center gap-x-2'>
            <ReactStars
              count={5}
              value={book.rating}
              size={24}
              activeColor="#ffd700"
              edit={false}
              isHalf={true}
            />
            <span>({book.ratingsCount})</span>
          </div>
        ) : (
          <div className='flex justify-start items-center gap-x-2'>
            <ReactStars
              count={5}
              value={book.rating}
              size={24}
              activeColor="#ffd700"
              edit={false}
              isHalf={true}
            />
            <span>({book.ratingsCount})</span>
          </div>
        )}
        <div className='flex justify-end items-center gap-x-2'>
          {!canLiked ? (
            <>
              <BiShow
                className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                onClick={() => setShowModal(true)}
              />
              <Link to={`/wishlist/delete/${book._id}`}>
                <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
              </Link>
            </>
          ) : (
            <>
              <BiShow
                className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                onClick={() => setShowModal(true)}
              />
              <FcLike
                className={`text-3xl text-blue-800 hover:text-black cursor-pointer ${isLiked ? ' scale-150' : ''}`}
                onClick={handleWishlistClick}
              />
            </>
          )}

        </div>
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default BookSingleCard;
