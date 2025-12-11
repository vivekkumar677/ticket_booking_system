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

module.exports = router;