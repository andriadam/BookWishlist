import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import ReactStars from "react-rating-stars-component";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full border-2 border-black h-auto bg-white rounded-xl p-4 flex flex-col relative'
      >
        <div className="">
          <AiOutlineClose
            className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer bg-black bg-opacity-30 rounded-md hover:text-red-400 '
            onClick={onClose}
          />
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {/* Kolom Kiri */}
          <div className='col-span-1'>
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                className='h-auto max-h-96 w-full object-cover'
                alt={book.title}
              />
            ) : (
              <div className='h-96 max-h-96 w-full bg-gray-300 flex text-center items-center justify-center'>
                No Image
              </div>
            )}
          </div>
          {/* Kolom Kanan */}
          <div className='col-span-1 md:mt-9'>
            <div className='flex justify-start items-center gap-x-2'>
              <PiBookOpenTextLight className='text-red-300 text-2xl' />
              <h2 className='my-1 text-lg font-semibold'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
