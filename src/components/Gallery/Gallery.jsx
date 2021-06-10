import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Container,  IconButton } from '@material-ui/core';

import {APIContext} from '../../App'
import API from '../../API/API'
import { useAuth } from '../../hocs/contexts/authContext';
import ImageUploadDialog from '../Utilities/ImageUploadDialog';
import { PhotoCamera } from '@material-ui/icons';
import GridList from '../UI/GridList'
import Viewer from './Viewer';


const Gallery = (props) => {
    // You need the instance and the import because of the static methods aren't available on the instance
    // TODO: Do a prettier transition on the initial loading of the images
    const [authContext, ] = useAuth()
    const APIInstance = useContext(APIContext)
    
    const [pics, setPics] = useState([])
    const [loading, setLoading] = useState(false)
    const [uploaderOpen, setUploaderOpen] = useState(false)
    const [viewerOpen, setViewerOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState()

    useEffect(() => {
        setLoading(true)
        APIInstance.getPrimaryImages({is_gallery_img: true})
        .then(resp => {setPics(resp.data.data.map(
            (pic, index) => ({...pic, src: API.prefixImgPath(pic.url), index: index})))
        })
        .catch(err => console.log(err))
    }, [APIInstance, uploaderOpen])

    const onClickHandler = (e, key) => {
        setViewerOpen(true)
        setSelectedImage(pics[key])
    }

    const deleteHandler = (e) => {
        API.deleteImage(selectedImage.id)
        .then(resp => {
            setViewerOpen(false)
            const updatedPics = [...pics]
            updatedPics.splice(selectedImage.index, 1) 
            setPics(updatedPics)
        })
        .catch(err => console.log(err))
    }

    const closeHandler = () => {
        setViewerOpen(false)
    }
    // const classes = useStyles()
    return (
        <Container>
            <Viewer open={viewerOpen} img={selectedImage} onClick={closeHandler} deleteHandler={deleteHandler}/>
           <GridList pics={pics} onClickHandler={onClickHandler}/>
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