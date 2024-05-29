const express = require('express');
const { getJobById, getJobs,getJobByUserId, createJob, closeJob } = require('../controllers/jobController');
const router = express.Router();

// Creating the job route
router.post('/create', createJob);

// Getting all jobs
router.get('/', getJobs);

// Getting job by id
router.get('/:id', getJobById);

// Getting all job by a perticular userId
router.get('/user/:userId', getJobByUserId);

// Closing a job
router.put('/:id/close', closeJob);

module.exports = router;
