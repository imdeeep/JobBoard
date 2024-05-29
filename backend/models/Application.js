const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: String,
        unique: true,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    applicationStatus:{
        type: String,
        enum: ['in review','accepted','rejected'],
        default:'in review'
    },
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
