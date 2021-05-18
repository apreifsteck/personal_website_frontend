import React, {Fragment} from 'react'

import {makeStyles, IconButton, Typography} from "@material-ui/core"
import {PhotoCamera} from "@material-ui/icons"
import {useForm} from '../Form'

const useStyles = makeStyles((theme) => ({
    normal: {color: theme.palette.primary.main},
    error: {color: theme.palette.error.main},

}))

const ImageInput = ({validations, onChange, value, icon, ...props}) => {
    const classes = useStyles()
    const [err, changeEvent] = useForm(validations, onChange, value, "img")
    const color = !err.failed ? classes.normal : classes.error

    return (
        <Fragment>
            <input
            accept="image/*" 
            style={{display: "none"}}
            id="icon-button-file" 
            name="image_upload"
            type="file" 
            onChange={changeEvent}
            />
            <label htmlFor="icon-button-file">
                <IconButton {...props} className={color} aria-label="upload picture" component="span" type="button">
                    {icon || <PhotoCamera />}
                </IconButton>
            </label>
            <Typography component="span" className={color} >{value ? value.name : err.helperText}</Typography>
        </Fragment>
    )
} 

export default ImageInput