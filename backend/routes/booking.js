const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create booking request seats
router.post('/', async (req, res) => {
    const client = await db.connect();
    try {
        const { show_id, seats_requested, user_info } = req.body;

        if (!show_id || !seats_requested || seats_requested <= 0) {
            return res.status(400).json({ error: 'Invalid booking request' });
        }

        await client.query('BEGIN');

        // Lock the show row
        const showResult = await client.query(
            'SELECT available_seats FROM shows WHERE id = $1 FOR UPDATE',
            [show_id]
        );
        if (showResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Show not found' });
        }

        const show = showResult.rows[0];
        let status;

        if (seats_requested <= show.available_seats) {
            status = 'CONFIRMED';
        } else if (show.available_seats > 0) {
            status = 'PENDING'; // partial availability, could implement waitlist
        } else {
            status = 'FAILED';
        }

        // Insert booking
        const insertBooking = await client.query(
            `INSERT INTO bookings (show_id, seats_requested, user_info, status)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [show_id, seats_requested, JSON.stringify(user_info || {}), status]
        );

        // Update available seats if confirmed
        if (status === 'CONFIRMED') {
            const remainingSeats = show.available_seats - seats_requested;
            await client.query(
                'UPDATE shows SET available_seats = $1 WHERE id = $2',
                [remainingSeats, show_id]
            );
        }

        await client.query('COMMIT');
        res.status(status === 'CONFIRMED' ? 201 : 400).json({ booking: insertBooking.rows[0] });

    } catch (err) {
        await client.query('ROLLBACK').catch(() => {});
        console.error('Booking error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release();
    }
});

//Get all bookings
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
        if(result.rowCount === 0) return res.status(404).json({ error: 'Booking not found' });
        res.json({ booking: result.rows[0] });
    } catch (err) {
        console.error('Fetch bookings error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;