const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getApplications, createApplication,getApplicationByJobId ,checkApplicationStatus,getApplicationByUserId,acceptApplication,rejectApplication} = require('../controllers/applicationController');

// Multer setup for file uploads
const resumeDir = path.join(__dirname, '..', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, resumeDir); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

// Getting all applications
router.get('/', getApplications);

// Getting application by jobId
router.get('/:jobId', getApplicationByJobId);

// getting application by userId
router.get('/user/:userId', getApplicationByUserId);

// Checking application by both userId and JobId
router.get('/check/:jobId/:userId', checkApplicationStatus);

// Creating an application with file upload
router.post('/apply', upload.single('resume'), createApplication);

// Accepting an application
router.put('/accept/:jobId/:userId', acceptApplication);

// Rejecting an application
router.put('/reject/:jobId/:userId', rejectApplication);

module.exports = router;
