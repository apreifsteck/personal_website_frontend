import React, { useState } from 'react';

import {makeStyles, Paper} from "@material-ui/core"
import Backdrop from '../../hocs/UI/Backdrop/Backdrop'
import { Translate } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "inherit",
        height: "inherit",
        objectFit: "contain",
    },
    paper: {
        // 16x9 aspect ratio
        height: "50vh",
        width: "88.88vw",
        backgroundColor: theme.palette.grey[800]
    }
}))

const Viewer = ({open, img, ...props}) => {
    const classes = useStyles()
    return (
        <Backdrop open={open} onClick={props.onClick}>
            <Paper className={classes.paper} elevation={8}>
                {img && <img src={img.src} alt={img.alt} className={classes.root}/>}
            </Paper>
        </Backdrop>
    );
};
export default Viewer;