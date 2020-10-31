const express = require('express');
const router = express.Router();

// @desc Loggin/Landing page
// @route GET /
router.get('/', (req, res) => {
    res.render('login', {
        layoyt: 'login',
    });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router