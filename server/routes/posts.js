// Import the Express framework and specific controllers for handling routes
import express from 'express';
import { getPosts, createPost,updatePost,deletePost,likePost } from '../controllers/posts.js';

// Create an Express router instance to handle routes for this module
const router = express.Router();


// Define HTTP GET route to fetch posts
router.get('/', getPosts);

// Define HTTP POST route to create a new post
router.post('/', createPost);

router.patch('/:id',updatePost)

router.delete('/:id',deletePost)
router.patch('/:id/likePost',likePost)
// Export the router to be used in other parts of the application
export default router;
