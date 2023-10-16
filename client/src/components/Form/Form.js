// Import necessary modules and components from libraries
import React, { useEffect, useState } from 'react'; // Import React and related hooks
import { TextField, Typography, Button, Paper } from '@mui/material'; // Import Material-UI components
import FileBase from 'react-file-base64'; // A component for handling file uploads
import useStyles from './styles'; // Custom styling for the component
import { useDispatch, useSelector } from 'react-redux'; // React Redux hook for dispatching actions
import { createPost, updatePost } from '../../actions/posts'; // Action for creating and updating a post

// Define a functional component called "Form"
const Form = ({ currentId, setCurrentId }) => {
  console.log(currentId);

  // Define and initialize a piece of state for holding post data
  const [postData, setPostData] = useState({
    creator: '',       // The creator of the post
    title: '',         // The title of the post
    message: '',       // The message content of the post
    tags: '',          // Tags associated with the post
    selectedFile: '',  // The selected image file (as a base64 string)
  });

  // Use the 'useSelector' hook to access the Redux store and retrieve a specific post (if 'currentId' is defined)
  //Here to show the details of the post when ... is pressed on the basis of id and data is brought from reducer and compared to currentId
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  console.log(post);

  // Use the "useStyles" function to apply custom styles from the imported styles module
  const classes = useStyles();

  // Access the dispatch function from Redux for dispatching actions
  const dispatch = useDispatch();

  // This effect updates the form data when an existing post is being edited
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (currentId) {
      // If 'currentId' is defined, it means we are updating an existing post
      //To call Api from front-end dispatch() method is used
      dispatch(updatePost(currentId, postData)); // Dispatch an action to update the post
    } else {
      // If 'currentId' is not defined, it means we are creating a new post
      dispatch(createPost(postData)); // Dispatch an action to create a new post
    }
    clear(); // Clear the form data
  };

  // Function to clear the form data
  const clear = () => {
    setCurrentId(null); // Clear the current post ID
    setPostData({
      creator: '',       // The creator of the post
      title: '',         // The title of the post
      message: '',       // The message content of the post
      tags: '',          // Tags associated with the post
      selectedFile: '',  // The selected image file (as a base64 string)
    });
  };

  // JSX rendering of the component
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        {/* Input fields for the creator's name, title, message, and tags */}
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        ></TextField>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        ></TextField>
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        ></TextField>

        {/* File input for uploading an image */}
        <div className='classes.fileInput'>
          {/* The FileBase component is used to handle file uploads */}
          <FileBase
            type='file' // Specifies that it's a file input
            multiple={false} // Allows selecting a single file
            // When a file is selected and processed by FileBase, this callback is invoked
            onDone={({ base64 }) => {
              // Create a new object that will represent the updated state
              setPostData({
                ...postData,
                selectedFile: base64, // Update the "selectedFile" field with the base64-encoded image data
              });
            }}
          />
        </div>

        {/* Buttons for submitting the form and clearing it */}
        <Button
          className={classes.buttononSubmit}
          variant='container'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

// Export the "Form" component as the default export
export default Form;
