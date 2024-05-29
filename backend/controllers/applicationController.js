const Application = require("../models/Application");
const transporter = require('../utils/emailService');

// Creating an application
exports.createApplication = async (req, res) => {
    try {
        const { jobId, userId, jobTitle, companyName, name, email, phoneNo } = req.body;
        const existingApplication = await Application.findOne({ jobId, userId });

        if (existingApplication) {
            console.log("You have already applied for this job.");
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        const resume = req.file.filename;
        const newApplication = new Application({
            jobId,
            jobTitle,
            companyName,
            userId,
            name,
            email,
            phoneNo,
            resume
        });

        await newApplication.save();
        const mailOptions = {
            from: 'jobboard867@gmail.com',
            to: email,
            subject: 'Job Application Submitted',
            html: `<h1>Dear ${name},</h1><p>Thank you for applying for the position of <b>${jobTitle}</b> at <b>${companyName}</b>. We have received your application and will review it shortly.</p><p>Best regards,<br/>Job Board Team</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Application submission email sent:', info.response);
            }
        });

        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Getting all applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Getting application by jobId
exports.getApplicationByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId });

        if (!applications.length) {
            return res.status(404).json({ message: "Job not found." });
        }

        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Getting application by UserId
exports.getApplicationByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const applications = await Application.find({ userId });

        if (!applications.length) {
            return res.status(404).json({ message: "No applications found for this user." });
        }

        res.status(200).json(applications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Checking Application Status
exports.checkApplicationStatus = async (req, res) => {
    try {
        const { jobId, userId } = req.params;
        const existingApplication = await Application.findOne({ jobId, userId });

        if (existingApplication) {
            return res.status(200).json({ hasApplied: true });
        } else {
            return res.status(200).json({ hasApplied: false });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Reject the application
exports.rejectApplication = async (req, res) => {
    try {
        const application = await Application.findOne({ jobId: req.params.jobId, userId: req.params.userId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        if (application.applicationStatus === 'rejected') {
            return res.status(400).json({ message: 'Application is already rejected' });
        }
        application.applicationStatus = 'rejected';
        await application.save();

        // Send rejection email
        const mailOptions = {
            from: 'jobboard867@gmail.com',
            to: application.email,
            subject: 'Job Application Update',
            html: `<h1>Dear ${application.name},</h1><p>We regret to inform you that your application for the position of <b>${application.jobTitle}</b> at <b>${application.companyName}</b> has been rejected.</p><p>Thank you for your interest.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Rejection email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: 'Application rejected successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Accept the application
exports.acceptApplication = async (req, res) => {
    try {
        const application = await Application.findOne({ jobId: req.params.jobId, userId: req.params.userId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        if (application.applicationStatus === 'accepted') {
            return res.status(400).json({ message: 'Application is already accepted' });
        }
        application.applicationStatus = 'accepted';
        await application.save();

        // Send acceptance email
        const mailOptions = {
            from: 'jobboard867@gmail.com',
            to: application.email,
            subject: 'Job Application Update',
            html: `<h1>Dear ${application.name},</h1><p>We regret to inform you that your application for the position of <b>${application.jobTitle}</b> at <b>${application.companyName}</b> has been accepted.</p><p>Thank you for your interest.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Acceptance email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: 'Application accepted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

