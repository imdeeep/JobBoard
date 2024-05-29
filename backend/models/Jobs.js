const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const jobSchema = new mongoose.Schema({
    jobId: { type: String, unique: true, default: uuidv4 },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    experience: { type: String, required: true },
    salary: { type: String, required: true },
    location: { type: String, required: true },
    role: { type: String, required: true },
    industryType: { type: String, required: true },
    department: { type: String, required: true },
    employmentType: { type: String, required: true },
    roleCategory: { type: String, required: true },
    education: { type: String, required: true },
    skills: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
