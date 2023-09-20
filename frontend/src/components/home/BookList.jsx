import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { MdOutlineDelete } from 'react-icons/md';
import ReactStars from "react-rating-stars-component";
import { BiShow } from 'react-icons/bi';
import { useState } from 'react';
import BookModal from './BookModal';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


const BooksList = ({ books, canLiked }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [modalBook, setModalBook] = useState(null);

  const handleShowModal = (book) => {
    setModalBook(book);
    setShowModal(true);
  };

  const handleWishlistClick = (book) => {
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
    <>
      <table className='w-full border my-4'>
        <thead>
          {!canLiked ? (
            <tr>
              <th className='border border-slate-600 px-1 py-3'>Cover</th>
              <th className='border border-slate-600 px-1 py-3'>Title</th>
              <th className='border border-slate-600 px-1 py-3 max-lg:hidden'>
                Author
              </th>
              <th className='border border-slate-600 px-1 py-3 max-md:hidden'>
                Rating
              </th>
              <th className='border border-slate-600 px-1 py-3'>Operations</th>
            </tr>
          ) : (
            <tr>
              <th className='colspan-5'></th>
            </tr>
          )}

        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td className='px-1 py-3 items-center'>
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    className='lg:h-36 lg:w-24 h-auto w-auto object-cover'
                    alt={book.title}
                  />
                ) : (
                  <div className='lg:h-36 lg:w-24 h-auto w-auto bg-gray-300 flex text-center items-center justify-center'>
                    No Image
                  </div>
                )}
              </td>
              <td className='px-1 py-3 text-center'>
                <h2 className='text-lg font-semibold'>{book.title}</h2>
              </td>
              <td className='px-1 py-3 text-center max-lg:hidden'>
                {book.authors}
              </td>
              <td className='px-1 py-3 text-center items-center max-md:hidden'>
                {book.rating !== 0 && book.ratingsCount !== 0 ? (
                  <div className='flex items-center'>
                    <ReactStars
                      count={5}
                      value={book.rating}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                      isHalf={true}
                    />
                    <span className='ml-2'>({book.ratingsCount})</span>
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <ReactStars
                      count={5}
                      value={book.rating}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                      isHalf={true}
                    />
                    <span className='ml-2'>({book.ratingsCount})</span>
                  </div>
                )}
              </td>
              <td className='px-1 py-3 text-center'>
                <div className='flex justify-center gap-x-4'>
                  {!canLiked ? (
                    <>
                      <BiShow
                        className='text-2xl text-blue-800 cursor-pointer'
                        onClick={() => handleShowModal(book)}
                      />
                      <Link to={`/wishlist/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600 cursor-pointer' />
                      </Link>
                    </>
                  ) : (
                    <>
                      <BiShow
                        className='text-2xl text-blue-800 cursor-pointer'
                        onClick={() => handleShowModal(book)}
                      />
                      <FcLike
                        className={`text-3xl text-blue-800 hover:text-black cursor-pointer ${isLiked ? 'scale-150' : ''}`}
                        onClick={() => handleWishlistClick(book)}
                      />
                    </>
                  )}
                </div>
                {showModal && (
                  <BookModal book={modalBook} onClose={() => setShowModal(false)} />
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BooksList;
