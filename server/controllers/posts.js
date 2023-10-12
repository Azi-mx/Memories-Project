import express from "express";
import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// Get all posts
export const getPosts = async (req, res) => {
    try {
        // Fetch all post messages from the database
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (e) {
        // Handle errors by returning a 404 status and an error message
        res.status(404).json({ message: e.message });
    }
}

// Create a new post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        // Save the new post to the database
        await newPost.save();
        console.log("Post Created");
        res.status(201).json(newPost);
    } catch (error) {
        // Handle errors by returning a 409 status and an error message
        res.status(409).json({ message: error.message });
    }
}

// Update an existing post
export const updatePost = async (req, res) => {
    try {
        // Extract the 'id' parameter from the request's parameters and rename it to '_id'
        const { id } = req.params;

        // Extract the updated post data from the request body
        const { title, message, creator, selectedFile, tags } = req.body;
        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

        // Check if the provided '_id' is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If it's not valid, return a 404 Not Found response
            return res.status(404).send('No Post Found with that id');
        }

        // Use Mongoose's 'findByIdAndUpdate' method to update a post by its '_id'
        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

        // Send a JSON response containing the updated post
        res.json(updatedPost);
    } catch (err) {
        // Handle errors by returning a 404 status and an error message
        res.status(404).send(`No Post Found with that id ${err}`);
    }
}

// Delete a post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    // Check if the provided 'id' is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If it's not valid, return a 404 Not Found response
        return res.status(404).send('No Post Found with that id');
    }

    // Use Mongoose's 'findByIdAndRemove' method to delete a post by its '_id'
    await PostMessage.findByIdAndRemove(id);

    // Send a JSON response indicating successful deletion
    res.json({ message: 'Post Deleted Successfully' });
}
export const likePost = async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If it's not valid, return a 404 Not Found response
        return res.status(404).send('No Post Found with that id');
    }
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1},{new:true})

    res.json(updatedPost)
}
