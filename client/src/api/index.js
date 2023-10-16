// Import the axios library for making HTTP requests
import axios from 'axios';

// Define the URL for the API endpoint
const url = 'https://azims-memories-project.onrender.com/posts';

// Function to fetch posts from the API
export const fetchPosts = () => axios.get(url);
// This function sends an HTTP GET request to the specified URL and returns a promise that resolves with the response data.

// Function to create a new post by sending a POST request to the API
export const createPost = (newPost) => axios.post(url, newPost);
// This function sends an HTTP POST request to the specified URL with the 'newPost' data and returns a promise.

// Function to update a post by sending a PATCH request to the API
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// This function sends an HTTP PATCH request to the specified URL with the 'id' and 'updatedPost' data to update an existing post.

export const deletePost = (id) => axios.delete(`${url}/${id}`)

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)