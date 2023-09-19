import mongoose from 'mongoose';

const wishlistBookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    ratingsCount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const WishlistBook = mongoose.model('WishlistBook', wishlistBookSchema);
