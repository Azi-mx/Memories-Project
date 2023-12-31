import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useStyles } from './styles'
import memories from '../../images/memories.png'
function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles()
    // const user = null;
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'> Memories </Typography>
                {/* Display an image in the AppBar */}
                <img className={classes.image} src={memories} alt='memories' height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user?.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary'>Logout</Button>
                    </div>
                ) : (
                    <Button variant='contained' component={Link} to='/auth' color='primary'>Sign In</Button>
                )}
            </Toolbar>
            {/* Display a heading in the AppBar */}

        </AppBar>
    )
}

export default Navbar