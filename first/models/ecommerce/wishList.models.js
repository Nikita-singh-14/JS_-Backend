import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  category: String,
  maxPrice: Number,
  notified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const WishList = mongoose.model("WishList", wishlistSchema);