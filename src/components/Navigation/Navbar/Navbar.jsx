import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
// Might also need button, IconButton, and menu icon

const Navbar = (props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography>App</Typography>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;