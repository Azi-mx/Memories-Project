// Import the API functions from the '../api' module
import * as api from '../api';
import { FETCH_ALL,UPDATE,CREATE,DELETE } from '../constants/actionTypes';
// Action Creators

// Action creator to fetch posts from the API and dispatch them to the Redux store
export const getPosts = () => async (dispatch) => {
    try {
        // Fetch posts data from the API using the 'fetchPosts' function
        const { data } = await api.fetchPosts();
        console.log(data);

        // Dispatch an action with the fetched data to update the Redux store
        // The dispatched action has a type 'FETCH_ALL' and a payload containing the fetched data
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        // If an error occurs during the API call, log the error message
        console.log(error.message);
    }
};

// Action creator to create a new post and dispatch it to the Redux store
export const createPost = (post) => async (dispatch) => {
    try {
        // Create a new post using the 'createPost' function from the API
        const { data } = await api.createPost(post);

        // Dispatch an action with the new post data to update the Redux store
        // The dispatched action has a type 'CREATE' and a payload containing the newly created post data
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        // If an error occurs during post creation, log the error message
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // Update an existing post using the 'updatePost' function from the API
        const { data } = await api.updatePost(id, post);
        console.log(data);

        // Check if the response data is empty, indicating an issue with the update
        if (!data) {
            throw new Error('The updated post data is empty.');
        }

        // Assuming the API response contains the updated post data in 'data'
        // Dispatch an action with the type 'UPDATE' and the updated post data
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        // If an error occurs during the update, log the error
        // You can also dispatch an action to handle the error in your Redux store if needed
        console.error('Error updating post:', err);
    }
}

// Action creator to delete a post and dispatch the action to the Redux store
export const deletePost = (id) => async (dispatch) => {
    try {
        // Delete a post using the 'deletePost' function from the API
        await api.deletePost(id);

        // Dispatch an action with the type 'DELETE' to indicate that the post has been deleted
        dispatch({ type: DELETE });
    } catch (error) {
        console.log(error)
        // Handle any errors that occur during the deletion if needed
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}
