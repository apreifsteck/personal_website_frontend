import React from 'react';
import {makeStyles, Backdrop, CircularProgress} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 100,
      color: '#fff',
    },
  }));

const LoadingBackdrop = (props) => {
    const classes = useStyles();
   
    return (
        <Backdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
export default LoadingBackdrop;