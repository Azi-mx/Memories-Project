// Define a Redux reducer function for handling posts
import { FETCH_ALL,UPDATE,CREATE,DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      // When the action type is FETCH_ALL, update the state with fetched posts
      // The payload of the action contains the fetched post data
      // We replace the existing state with the new array of posts from the payload
      return action.payload;

    case CREATE:
      // When the action type is 'CREATE', add the newly created post to the state
      // We create a new array using the spread operator (...) that includes the existing posts and the new post
      return [...posts, action.payload];

    case UPDATE:
    case 'LIKE':
      // When the action type is 'UPDATE', update the post in the state with the new data
      // We use the map function to create a new array of posts
      // For the post with the matching _id, replace it with the new data (action.payload)
      // For other posts, keep them as they are
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      // When the action type is 'DELETE', remove the post from the state based on the _id in the payload
      // We use the filter function to create a new array that excludes the deleted post
      console.log("Delete reducer called")
      return posts.filter((post) => post._id !== action.payload);

    default:
      // For any other action type, return the current state
      // This ensures that the state remains unchanged if the action type doesn't match any cases
      return posts;
  }
};
