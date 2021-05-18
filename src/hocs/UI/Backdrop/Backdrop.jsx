import React from 'react';
import {makeStyles, Backdrop as MuiBackdrop} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 100,
      color: '#fff',
    },
  }));

const Backdrop = (props) => {
    const classes = useStyles();
   
    return (
        <MuiBackdrop className={classes.backdrop} {...props}>
            {props.children}
        </MuiBackdrop>
    );
};
export default Backdrop;