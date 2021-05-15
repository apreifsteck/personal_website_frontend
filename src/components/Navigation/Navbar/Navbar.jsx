import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
// Might also need button, IconButton, and menu icon

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
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
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography align='left' variant="h6" className={classes.title}>App</Typography>
                    <Button color="inherit">
                        <Link to="/login" className={classes.link}>Login</Link>
                    </Button>
                </Toolbar>
            </AppBar>    
        </div>
        
    );
};
export default Navbar;