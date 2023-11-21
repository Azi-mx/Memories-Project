// Import required modules and set up the express app
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';

const app = express();
dotenv.config()
// Enable CORS to allow requests from different origins
app.use(cors());
// Middleware for parsing incoming JSON data and URL-encoded data
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



// Import routes for handling posts
import postRoutes from './routes/posts.js';

// Use the postRoutes middleware for handling routes starting with /posts
app.use('/posts', postRoutes);

// MongoDB connection URL
// const CONNECTION_URL = 'mongodb+srv://azim_memon:Afraz123@clusters.l7snngf.mongodb.net/?retryWrites=true&w=majority';

// Port for the server to listen on
const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database and start the server
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running at ${PORT}`)))
  .catch((err) => console.log(err.message));
