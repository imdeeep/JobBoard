const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('./config/googleAuth'); 
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const app = express();
const port = process.env.PORT || 5000;
const CALL_URL = process.env.CALL_URL;

// Connecting to the database 
connectDb().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: 'Lax' } // Change secure to true in production
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/resume', express.static("resume"));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const payload = {
        user: {
            id: req.user.id,
            userType: req.user.userType
        }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) {
            console.error('JWT sign error:', err);
            return res.status(500).send('Error signing token');
        }
        res.redirect(`${CALL_URL}/auth/google/callback?tk=${token}`);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal server error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
