const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const showRoutes = require('./routes/shows');
const bookingRoutes = require('./routes/booking');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());


app.use('/admin', adminRoutes);
app.use('/shows', showRoutes);
app.use('/bookings', bookingRoutes);

// Sample route to test database connection
app.get('/', (req, res) => res.json({ ok: true}))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));