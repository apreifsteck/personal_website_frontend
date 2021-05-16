import React from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import {Link, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: "1.3em"
    },
    links: theme.bareLink
}))

const Crumb = (props) => {
    const classes = useStyles()
    return (
        props.tail ?
        <Typography className={classes.root}>
            {props.children}
        </Typography> :
        <Link {...props} component={BrowserLink} className={classes.root}>
            {props.children}
        </Link> 
    );
};
export default Crumb;