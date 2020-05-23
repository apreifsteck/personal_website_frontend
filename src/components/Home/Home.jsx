import React from 'react';

import { Grid, GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import { Paper, Divider, Typography, IconButton } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles'


const Home = (props) => {
    const classes = styles();

    const gridListTiles = [
        {
            title: "React",
            src: "logo192.png"
        },
        {
            title: "Material UI",
            src: "material-ui_logo.svg"
        },
        {
            title: "Phoenix",
            src: "phoenix_logo.svg"
        },

        {
            title: "Docker",
            src: "docker_logo.png"
        }
    ].map(item => (
        <GridListTile
            key={item.src}
        // className={classes.gridItem}
        >
            <img
                className={classes.gridItem}
                src={item.src}
            />
            <GridListTileBar
                title={item.title}
            />
        </GridListTile>
    ))
    return (
        <Grid container direction="column">
            <Grid item container direction="column" spacing={10}>

                <Grid item >
                    <Typography gutterBottom variant="h2" align="left">
                        Welcome to my website!
            </Typography>
                    {/* <Divider variant="middle" /> */}
                    <Typography align="left" variant="body1" gutterBottom>
                        Hi. This is my website. I put it together for one reason: In a world where everyone
                        is trying to put their best foot forward, I wanted to put my real one forward.
            </Typography>
                    <Typography align="left" variant="body1">
                        What I mean is, this website is my way of expressing myself. Authentically. Sucking up is for résumés. Don't worry, I've got one of those here too, because I'm just like everyone else.
            </Typography>
                </Grid>

                <Grid item>
                    <ButtonGroup
                        size="large"
                        color="primary"
                        aria-label="large outlined primary button group"
                    >
                        <Button>About Me</Button>
                        <Button>Blog</Button>
                        <Button>Art</Button>
                        <Button>Trashcan</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item>
                    <IconButton className={classes.buttons}>
                        <ExpandMoreIcon style={{ fontSize: 60 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container direction="column">
                <Grid item>
                    <Typography>
                        This website was built with these technologies:
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    justify="center"
                >
                    <GridList
                        className={classes.gridList}
                        cols={4}
                    >
                        {gridListTiles}
                    </GridList>
                </Grid>

            </Grid>
        </Grid>

    );
};
export default Home;