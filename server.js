const express = require('express');
const app = express();

// server.js



const PORT = process.env.PORT || 5000;

const connectDB = require('./config/database'); // Use the correct case!
connectDB();

// Middleware to parse JSON
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

app.get('/', (req, res) => res.send('API running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
