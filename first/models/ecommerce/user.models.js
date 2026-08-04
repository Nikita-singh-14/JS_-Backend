import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrollmentNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    hostel: {
        type: String,
        default: ''
    },
    Address:{
        type: String,
        required:true
    },
    phone: {
        type: String,
        default: ''
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);