import { Dialog, DialogActions, DialogContent, DialogTitle, Switch, FormControlLabel, makeStyles, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GridList from '../../UI/GridList'
import {useAPI} from '../../../hooks/contexts/APIContext'
import API from '../../../API/API'

// TODO: open up a channel so that this can recieve events on image upload/delete


const useStyles = makeStyles((theme) => ({
    content: {
        overflow: "hidden"
    }
}))

const UploadsDialog = ({onClose, open, onPicClick, ...props}) => {
    const api = useAPI()
    const [pics, setPics] = useState([])
    const [killMode, setKillMode] = useState(false)

    useEffect(() => {
        api.getPrimaryImages({is_gallery_img: false})
        .then(resp => {
            setPics(resp.data.data.map((item, index) => ({
                ...item, 
                src: API.prefixImgPath(item.url), 
                index: index,
                highlight: false
            })))
        })
        .catch(err => console.log(err))
    }, [])

    const toggleKillMode = (e) => {
        const mode = e.target.checked
        setKillMode(mode)
        if(!mode){
            setPics(pics.map((pic) => ({...pic, highlight: false})))
        }
    }

    const markForDeath = (pictureIndex) => {
        const img = {...pics[pictureIndex]}
        img.highlight = !img.highlight
        const updatedPics = [...pics]
        updatedPics[pictureIndex] = img
        setPics(updatedPics)
    }
    
    const kill = () => {
        pics
        .filter((pic) => pic.highlight == true)
        .map((pic) => {
            API.deleteImage(pic.id)
            .then(resp => null)
            .catch(err => console.log(err))
        })

        setPics(pics.filter((pic) => !pic.highlight))
    }

    const onClickHandler = (e, pictureIndex) => {
        if(killMode){
            markForDeath(pictureIndex)
        } else {
            onPicClick(pics[pictureIndex])
            onClose()
        }
        
    }

    const classes = useStyles()
    return (
        <Dialog open={open} fullWidth onBackdropClick={onClose} className={classes.root}>
            <DialogTitle>Pick an image to insert</DialogTitle>
            <DialogActions>
                <FormControlLabel
                value="start"
                control={
                <Switch color="secondary" checked={killMode} onChange={toggleKillMode} />
                }
                label="KILL MODE"
                labelPlacement="start"
                />
                <Button variant="contained" color="secondary" onClick={kill} disabled={!killMode}>KILL</Button>
            </DialogActions>
            <DialogContent className={classes.content}>
                <GridList pics={pics} onClickHandler={onClickHandler} spacing={10}/>
            </DialogContent>
        </Dialog> 
    );
};
export default UploadsDialog;