const express = require('express');
const router = express.Router();
const db = require('../config/db');


// Create a show/trip
router.post('/create-shows', async (req, res) => {
    console.log('Request body:', req.body);
    try {
        const { name, start_time, total_seats } = req.body;
        if( !name || !start_time || typeof total_seats !== 'number' ) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        const result = await db.query(
            `INSERT INTO shows (name, start_time, total_seats, available_seats) values ($1, $2, $3, $4) RETURNING *`,
            [name, start_time, total_seats, total_seats]
        );
        res.status(201).json({ show: result.rows[0] });
    } catch (err) {
        console.error('Error creating show:', err.message);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});

// List all shows/admin 
router.get('/list-shows', async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM shows ORDER BY id`);
        res.json({ shows: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;