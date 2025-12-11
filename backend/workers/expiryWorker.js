// src/workers/expiryWorker.js
const cron = require('node-cron');
const db = require('../db');

const start = () => {
  // run every 30 seconds
  cron.schedule('*/30 * * * * *', async () => {
    try {
      const client = await db.getClient();
      await client.query('BEGIN');

      // Find PENDING bookings older than 2 minutes
      const res = await client.query(
        `SELECT id, show_id, seats_requested FROM bookings WHERE status='PENDING' AND created_at < NOW() - INTERVAL '2 minutes' FOR UPDATE SKIP LOCKED`
      );

      if (res.rowCount === 0) {
        await client.query('COMMIT');
        client.release();
        return;
      }

      for (const b of res.rows) {
        // mark booking failed
        await client.query(`UPDATE bookings SET status='FAILED', updated_at=NOW() WHERE id=$1`, [b.id]);
        // restore seats
        await client.query(`UPDATE shows SET available_seats = available_seats + $1 WHERE id=$2`, [b.seats_requested, b.show_id]);
      }

      await client.query('COMMIT');
      client.release();
    } catch (err) {
      console.error('Expiry worker error', err);
    }
  });
};

module.exports = { start };
