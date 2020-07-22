const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.use(express.json({ extended: false }));

const connectDB = require('./config/db');

connectDB();

app.get('/', (req, res) => {
    res.send('Howdy');
})


// Routes >>>

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/aim', require('./routes/api/aim'));

// Routes <<<

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})