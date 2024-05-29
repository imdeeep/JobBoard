const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['Candidate', 'Employer'],
        required: true
    },
    userId:{
        type: String,
        default: uuidv4,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
