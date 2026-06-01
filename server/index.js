const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is required in environment variables.');
}

app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});