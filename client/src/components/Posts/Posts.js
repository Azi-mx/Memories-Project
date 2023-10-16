import React from 'react';
import Post from './Post/Post.js'; // Import the Post component
import useStyles from './styles'; // Import the custom styles
import { useSelector } from 'react-redux'; // Import the useSelector hook from react-redux
import { Grid, CircularProgress } from '@mui/material';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles(); // Apply the custom styles

  // Use the useSelector hook to access the 'posts' state from the store
  const posts = useSelector((state) => state.posts);
  // console.log(posts);  Log the retrieved posts data to the console
  return (
    // Conditional rendering: If there are no posts, display a loading spinner (CircularProgress)
    !posts.length ? (
      <CircularProgress />
    ) : (
      // If there are posts, render a grid of posts
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          // Map through each post in the 'posts' array and create a Post component for each
          // 'key' is set to 'post.id' to uniquely identify each Post component
          <Grid key={post.id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;
