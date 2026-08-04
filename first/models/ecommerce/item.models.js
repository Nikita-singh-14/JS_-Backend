import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        enum: ["calsi", "StudyTable", "books", "furniture", "Lab Items", "Bycycles", "indusction", "Gas Chulha", "other"],
        required: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['Like New', 'Good', 'Average']
    },
    location: {                 
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }]

}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);