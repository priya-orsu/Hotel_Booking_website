const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'https://vshotelbookingwebsite.netlify.app',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

require('./db.js');

const roomsRoutes = require('./routes/roomsRoutes.js');
const userRoutes = require('./routes/userRoute.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

app.use('/api/rooms', roomsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Server Error',
    message: err.message 
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});