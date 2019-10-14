const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const CarSchema = mongoose.Schema({
    vehicleNumber: {
        type: String,
        unique: true,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    seating: {
        type: Number,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    booking: {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        issueDate: {
            type: String
        },
        returnDate: {
            type: Date
        }
    }
});

CarSchema.plugin(uniqueValidator);

const Car = module.exports = mongoose.model('Cars', CarSchema);