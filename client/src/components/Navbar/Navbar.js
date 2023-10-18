import React from 'react'
import { AppBar, Typography } from '@mui/material';
import {Link} from 'react-router-dom';
import { useStyles } from '../../styles'
import memories from '../../images/memories.png'
function Navbar() {
    const classes = useStyles()
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography  className={classes.heading} variant='h2' align='center'> Memories </Typography>
                {/* Display an image in the AppBar */}
                <img className={classes.image} src={memories} alt='memories' height='60' />
            </div>
            {/* Display a heading in the AppBar */}

        </AppBar>
    )
}

export default Navbar