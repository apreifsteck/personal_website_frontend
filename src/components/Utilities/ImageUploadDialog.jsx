import React, { useRef, useState } from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, 
    // IconButton, 
    makeStyles, Button, 
    // Typography
} from "@material-ui/core"

// import {PhotoCamera} from "@material-ui/icons"

import TextField from '../UI/TextField'
import {length, required} from '../UI/validators'
import Form from '../UI/Form'
// import API from '../../API/API'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
      display: 'none',
    },
    textField: {
        display: 'block'
    }
  }));

const ImageUploadDialog = (props) => {
    // const formRef = useRef()
    const handleSubmit = (e) => {
        console.log("handling submission")
    }

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [, setImg] = useState({name: ""})

    const handleImgChange = (e) => {
        console.log(e.target.files)
        setImg(e.target.files[0])
    }

    const validators = [required, length(5)]

    const classes = useStyles()
    return (
        <Dialog {...props} fullWidth>
            <DialogTitle>Upload an Image</DialogTitle>
            <Form onSubmit={handleSubmit}>
                <DialogContent className={classes.root}>
                    <TextField 
                        label="Title" 
                        variant="outlined" 
                        className={classes.textField}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        validations={validators}
                        />
                    <TextField 
                        fullWidth
                        multiline
                        label="Description"
                        variant="outlined"
                        value={desc}
                        className={classes.textField}
                        onChange={(e) => setDesc(e.target.value)} 
                        />
                    {/* <input
                    accept="image/*" 
                    className={classes.input} 
                    id="icon-button-file" 
                    name="image_upload"
                    type="file" 
                    onChange={handleImgChange}
                    required
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" type="button">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Typography component="span" color="primary">{img.name}</Typography> */}
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary" variant="outlined">Submit</Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
};
export default ImageUploadDialog;