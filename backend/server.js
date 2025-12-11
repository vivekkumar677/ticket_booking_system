const express = require('express');
const adminRoutes = require('./routes/admin');
const showRoutes = require('./routes/shows');
const bookingRoutes = require('./routes/booking');

const app = express();

app.use(express.json());


app.use('/admin', adminRoutes);
app.use('/shows', showRoutes);
app.use('/bookings', bookingRoutes);

// Sample route to test database connection
app.get('/', (req, res) => res.json({ ok: true}))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));