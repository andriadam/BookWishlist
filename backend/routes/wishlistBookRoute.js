import express from 'express';
import { WishlistBook } from '../models/wishlistBookModel.js';

const router = express.Router();

// Route for Get All wishlistBooks from database
router.get('/', async (request, response) => {
  try {
    const wishlistBooks = await WishlistBook.find({});

    return response.status(200).json({
      count: wishlistBooks.length,
      data: wishlistBooks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const wishlistBook = await WishlistBook.findById(id);

    return response.status(200).send({ data: wishlistBook });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a wishlistBook
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await WishlistBook.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Save
router.post('/', async (request, response) => {
  // return response.status(201).send(request.body);
  try {
    if (
      !request.body.title ||
      !request.body.authors ||
      !request.body.thumbnail
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, authors, thumbnail',
      });
    }
    const addWishlistBook = {
      title: request.body.title,
      authors: request.body.authors,
      thumbnail: request.body.thumbnail,
      rating: request.body.rating,
      ratingsCount: request.body.ratingsCount,
    };

    const result = await WishlistBook.create(addWishlistBook);

    return response.status(201).send({
      message: 'Book created successfully',
      data: result
    });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.authors ||
      !request.body.thumbnail
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, authors, thumbnail',
      });
    }

    const { id } = request.params;

    const result = await WishlistBook.findByIdAndUpdate(id, request.body);
    // return response.status(200).send(result);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({
      message: 'Book updated successfully',
      data: result
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;
