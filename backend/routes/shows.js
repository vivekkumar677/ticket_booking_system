const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const result = await db.query(`SELECT id, name, start_time, total_seats, available_seats FROM shows ORDER BY start_time`);
        res.json({ shows: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router .get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(`SELECT id, name, start_time, total_seats, available_seats FROM shows WHERE id = $1`, [id]);
        if(result.rowCount === 0) return res.status(404).json({ error: 'Show not found' });
        res.json({ show: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:id/book', async (req, res) => {
    try {
        const { id } = req.params;
        const { seats } = req.body;

        // TODO: implement booking logic
        // e.g., check available seats, reduce count, mark booking as PENDING/CONFIRMED

        // Update available seats
        const result = await db.query(`UPDATE shows SET available_seats = available_seats - $1 WHERE id = $2`, [seats.length, id]);
        if(result.rowCount === 0) return res.status(404).json({ error: 'Show not found' });

        // Mark booking as PENDING
        await db.query(`INSERT INTO bookings (show_id, seats_requested, status) VALUES ($1, $2, 'PENDING')`, [id, seats.length]);

        // Update available seats

        res.json({ status: 'CONFIRMED' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'FAILED' });
    }
});

module.exports = router;