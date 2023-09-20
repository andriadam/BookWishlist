import { AiOutlineClose } from 'react-icons/ai';

const DeleteModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <p className='mt-4'>Are you sure ?</p>
        <p className='my-2'>
          Delete wishlist {book.title} from wishlist
        </p>
      </div>
    </div>
  );
};

export default DeleteModal;
