import { combineReducers } from "redux";
import posts from './posts'; // Import the posts reducer

// Combine reducers using combineReducers function
export default combineReducers({
  // Map each reducer to a specific key in the state
  posts: posts, // Using ES6 shorthand, you can write this as "posts"
});
