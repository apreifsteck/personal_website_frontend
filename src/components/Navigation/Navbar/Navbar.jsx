import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';

import API from '../../../API/API'
import { useAuth, actions } from '../../../hocs/contexts/authContext';
// Might also need button, IconButton, and menu icon

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
    link: {
        textDecoration: "none",
        '&:visited': {
            color: "inherit"
        }
    }
}))

const Navbar = (props) => {
    const [authState, authDispatch] = useAuth()
    const classes = useStyles()

    const logoutHandler = () => {
        API.deleteSession()
        .then(resp => {
            authDispatch({type: actions.DELETE_SESSION})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography align='left' variant="h6" className={classes.title}>App</Typography>
                    <Button color="inherit">
                        {authState.accessToken ?
                        <Link to="/home" onClick={logoutHandler} className={classes.link}>Logout</Link> :
                        <Link to="/login" className={classes.link}>Login</Link>
                        }
                    </Button>
                </Toolbar>
            </AppBar>    
        </div>
        
    );
};
export default Navbar;