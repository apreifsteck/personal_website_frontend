import React, { useState, Fragment } from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, 
    makeStyles, Button, 
    Typography
} from "@material-ui/core"


import TextField from '../UI/Form/FormInputs/TextField'
import {length, required} from '../UI/validators'
import Form from '../UI/Form/Form'
import ImageInput from '../UI/Form/FormInputs/ImageInput'
import LoadingBackdrop from '../UI/LoadingBackdrop';
import API from '../../API/API'

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

const ImageUploadDialog = ({onClose, ...props}) => {
    const handleSubmit = (e) => {
        setLoading(true)
        API.uploadImage(title, desc, img)
        .then(resp => {
            setLoading(false)
            onClose()
        })
        .catch(err => console.log(err))
    }

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState()
    const [loading, setLoading] = useState(false)

    const handleImgChange = (e) => {
        setImg(e.target.files[0])
    }

    const validators = [required, length(2)]

    const classes = useStyles()
    return (
        <Fragment>
            <LoadingBackdrop open={loading}/>
            <Dialog {...props} fullWidth>
                <DialogTitle>Upload an Image</DialogTitle>
                <Form onSubmit={handleSubmit} failedValidationCallback={() => console.log("form invalid")}>
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
                        <ImageInput validations={[required]} onChange={handleImgChange} value={img} />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary" variant="outlined">Submit</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </Fragment>
    );
};
export default ImageUploadDialog;