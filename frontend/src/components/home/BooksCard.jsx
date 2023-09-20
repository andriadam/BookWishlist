import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books, canLiked }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 xl:grid-cols-4'>
      {books.map((item, index) => (
        <BookSingleCard key={index} book={item} canLiked={canLiked} />
      ))}
    </div>
  );
};

export default BooksCard;
