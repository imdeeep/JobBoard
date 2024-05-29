const Job = require('../models/Jobs');

exports.createJob = async (req, res) => {
    try {
        const { jobTitle, companyName, experience, salary, location, role, industryType, department, employmentType, roleCategory, education, skills, description,userId,email } = req.body;

        const job = new Job({
            jobTitle,
            companyName,
            experience,
            salary,
            location,
            role,
            industryType,
            department,
            employmentType,
            roleCategory,
            education,
            skills,
            description,
            userId,
            email,
        });

        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findOne({ jobId: req.params.id })
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getJobByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const jobs = await Job.find({ userId });
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'Jobs not found' });
        }
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.closeJob = async (req, res) => {
    try {
        const job = await Job.findOne({ jobId: req.params.id });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        job.status = 'closed';
        await job.save();
        res.status(200).json({ message: 'Job closed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
