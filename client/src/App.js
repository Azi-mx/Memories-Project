// Import necessary modules from React and Material-UI libraries
import React, {useState,useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import memories from './images/memories.png'; // Import an image
import Form from './components/Form/Form.js'; // Import the Form component
import Posts from './components/Posts/Posts.js'; // Import the Posts component
import { useStyles } from './styles'; // Import the custom styles
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { getPosts } from './actions/posts'; // Import the getPosts action

// Define the main App component
const App = () => {
  const [currentId,setCurrentId] = useState(0)
  const classes = useStyles(); // Apply the custom styles
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  useEffect(() => {
    // Fetch posts when the component mounts
    dispatch(getPosts());
  }, [currentId,dispatch]);

  return (
    <Container maxwidth="lg">
      {/* Create an AppBar with custom styling */}
      <AppBar className={classes.appBar} position="static" color="inherit">
        {/* Display a heading in the AppBar */}
        <Typography className={classes.heading} variant='h2' align='center'> Memories </Typography>
        {/* Display an image in the AppBar */}
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </AppBar>
      
      {/* Apply a Grow effect to the container */}
      <Grow in>
        <Container>
          {/* Create a Grid container with specified alignment and spacing */}
          <Grid container className={classes.mainContainer}  justify="space-between" align-items="stretch" spacing={3}>
            {/* Display the Posts component in a Grid item */}
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            {/* Display the Form component in another Grid item */}
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App; // Export the App component