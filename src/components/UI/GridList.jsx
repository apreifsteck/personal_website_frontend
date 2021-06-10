import React from 'react';
import {GridList as MuiGridList, GridListTile, GridListTileBar, makeStyles} from "@material-ui/core"


const cellHeight = 240

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    tile: {
        borderRadius: "8px",
        cursor: "pointer",
    },
    highlight: {
        border: "4px solid",
        borderColor: theme.palette.secondary.main
    },
    paper: {
        backgroundColor: theme.palette.grey[200],
    },
    gridList: {
        width: "max-content",
        maxWidth: "80%",
        height: "max-content",
        maxHeight: "80vh",
        paddingTop: "10px",
        paddingBottom: "20px"
    },
    image: {
        // objectFit: "cover",
        objectFit: "fill"
        // width: "inherit",
        // height: "inherit"
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    button: {
        height: "max-content",
        width: "max-content"
    }
  }));

const GridList = ({pics, onClickHandler, ...props}) => {
    const classes = useStyles()
    const tileClasses = [classes.tile, classes.highlight]
    return (
        <div className={classes.root}>
        <MuiGridList cellHeight={cellHeight} className={classes.gridList} spacing={props.spacing || 5}>
            {pics.map((pic, index) => (
            <GridListTile 
            key={index} 
            onClick={(e) => onClickHandler(e, index)} 
            classes={pic.highlight ? {tile: tileClasses.join(" ")} : {tile: tileClasses[0]}}
            >
                <img src={pic.src} alt={pic.title} className={classes.image} />
                <GridListTileBar
                title={pic.title}
                subtitle={<span>{pic.description}</span>}
                />
            </GridListTile>
            

            ))}
        </MuiGridList>
    </div>
    );
};
export default GridList;