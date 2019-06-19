import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import config from 'config';
import Items from './routes/api/items';
import Users from './routes/api/users';
import Auth from './routes/api/auth';
import Categorie from './routes/api/categorie';

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', Items);
app.use('/api/users', Users);
app.use('/api/auth', Auth);
app.use('/api/categorie', Categorie);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));