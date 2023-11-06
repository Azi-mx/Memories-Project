// Importing necessary dependencies and styles
import React from 'react'; // Importing the React library
import useStyles from './styles'; // Importing a custom style module
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material'; // Importing Material-UI components
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; // Importing the thumbs-up icon
import DeleteIcon from '@mui/icons-material/Delete'; // Importing the delete icon
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Importing the "more options" icon
import moment from 'moment'; // Importing the Moment.js library to format timestamps
import {useDispatch} from 'react-redux'
import {deletePost,likePost,getPosts} from '../../../actions/posts'
// Defining the Post component
const Post = ({ post, setCurrentId }) => {
  // Destructuring the post and setCurrentId from props
  const classes = useStyles(); // Applying styles from the custom style module
  const dispatch = useDispatch();
  return (
    <Card className={classes.card}>
      {/* The card component is the main container for the post */}
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      {/* The CardMedia component displays the post's image */}
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        {/* Displaying post creator and the time since post creation */}
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
        {/* A button to show more options for the post */}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)}
          {/* Displaying post tags */}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
        {/* Displaying the post title */}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
        {/* Displaying the post message */}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small'  color='primary' onClick={() => {dispatch(likePost(post._id)) }}>
          <ThumbUpAltIcon fontSize='small' />
         &nbsp; Like &nbsp;
          {post.likeCount}
          {/* A button to like the post and display the number of likes */}
        </Button>
        <Button size='small' color='primary' onClick={() => {dispatch(deletePost(post._id),getPosts())}}>
          <DeleteIcon fontSize='small' />
          Delete
          {/* A button to delete the post */}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post; // Export the Post component to be used elsewhere in the application
