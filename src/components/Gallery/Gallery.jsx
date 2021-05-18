import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Container, GridList, GridListTile, GridListTileBar, makeStyles, ButtonBase, IconButton } from '@material-ui/core';

import {APIContext} from '../../App'
import API from '../../API/API'
import { useAuth } from '../../hocs/contexts/authContext';
import ImageUploadDialog from '../Utilities/ImageUploadDialog';
import { PhotoCamera } from '@material-ui/icons';
import Viewer from './Viewer';

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
    const [viewerOpen, setViewerOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState()

    useEffect(() => {
        APIInstance.getPrimaryImages()
        .then(resp => setPics(resp.data.data.map(
            (pic) => ({src: API.getImagePathFromFilename(pic.filename), 
                title: pic.title, description: pic.description}))))
        .catch(err => console.log(err))
    }, [APIInstance, uploaderOpen])

    const onClickHandler = (e, key) => {
        setViewerOpen(true)
        setSelectedImage(pics[key])
    }
    const closeHandler = () => {
        setViewerOpen(false)
    }
    const classes = useStyles()
    return (
        <Container>
            <Viewer open={viewerOpen} img={selectedImage} onClick={closeHandler}/>
            <div className={classes.root}>
                <GridList cellHeight={240} className={classes.gridList}>
                    {pics.map((pic, index) => (
                    <GridListTile key={index} className={classes.tile} onClick={(e) => onClickHandler(e, index)} component={ButtonBase}>
                        <img src={pic.src} alt={pic.title} className={classes.image} />
                        <GridListTileBar
                        title={pic.title}
                        subtitle={<span>{pic.description}</span>}
                        />
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