import React from 'react';

import {Button, makeStyles, Paper, Grid} from "@material-ui/core"
import Backdrop from '../../hocs/UI/Backdrop/Backdrop'
import { useAuth } from '../../hocs/contexts/authContext';

const useStyles = makeStyles((theme) => ({
    image: {
        width: "inherit",
        height: "inherit",
        objectFit: "contain",
    },
    paper: {
        // 16x9 aspect ratio
        height: "50vh",
        width: "88.88vw",
        backgroundColor: theme.palette.grey[800]
    },
    button: {
        color: theme.palette.secondary.main,
        margin: 20
    }
}))

const Viewer = ({open, img, ...props}) => {
    const [authContext, ] = useAuth()

    const classes = useStyles()
    return (
        <Backdrop open={open} onClick={props.onClick}>
            <Grid container direction="column" alignContent="center">
                <Grid item>
                    <Paper className={classes.paper} elevation={8}>
                        {img && <img src={img.src} alt={img.alt} className={classes.image}/>}
                    </Paper>
                </Grid>
                <Grid item>
                    {authContext.accessToken && 
                    <Button 
                    size="large" 
                    variant="contained" 
                    className={classes.button}
                    onClick={props.deleteHandler}
                    >Delete</Button>
                    }
                </Grid>
            </Grid>
            
        </Backdrop>
    );
};
export default Viewer;