import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Container, GridList, GridListTile, GridListTileBar, makeStyles, ButtonBase, IconButton } from '@material-ui/core';

import {APIContext} from '../../App'
import API from '../../API/API'
import { useAuth } from '../../hocs/contexts/authContext';
import ImageUploadDialog from '../Utilities/ImageUploadDialog';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    tile: {
        backgroundColor: theme.palette.background.paper,
        height: "max-content",
        width: "max-content"
        // width: "min-content"
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
        // height: "max-content",
        // width: "max-content",
        height: "100%",
        width: "100%",
        objectFit: "contain"
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    button: {
        height: "max-content",
        width: "max-content"
    }
  }));

const Gallery = (props) => {
    // You need the instance and the import because of the static methods aren't available on the instance
    const [authContext, ] = useAuth()
    const APIInstance = useContext(APIContext)
    
    const [pics, setPics] = useState([])
    const [uploaderOpen, setUploaderOpen] = useState(false)

    useEffect(() => {
        APIInstance.getPrimaryImages()
        .then(resp => setPics(resp.data.data))
        .catch(err => console.log(err))
    }, [APIInstance])

    const onClickHandler = (e) => {
        console.log("clicked")
    }

    const classes = useStyles()
    return (
        <Container>
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    {pics.map((pic) => (
                    <GridListTile key={pic.filename} className={classes.tile} onClick={onClickHandler} component={ButtonBase}>
                        <img src={API.getImagePathFromFilename(pic.filename)} alt={pic.title} className={classes.image} />
                        <GridListTileBar
                        title={pic.title}
                        subtitle={<span>{pic.description}</span>}
                        />
                        {/* <img src={API.getImagePathFromFilename(pic.filename)} alt={pic.title} className={classes.image} />
                        <GridListTileBar
                        title={pic.title}
                        subtitle={<span>{pic.description}</span>}
                        /> */}
                    </GridListTile>
                    ))}
                </GridList>
            </div>
            {authContext.uname && (
                <Fragment>
                    <IconButton onClick={() => setUploaderOpen(true)}>
                        <PhotoCamera />
                    </IconButton>
                    <ImageUploadDialog open={uploaderOpen} onClose={() => setUploaderOpen(false)}/>
                </Fragment>
            )}
        </Container>

    );
};
export default Gallery;