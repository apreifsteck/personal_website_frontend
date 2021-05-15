import React, { useRef, useEffect } from 'react';

import {  Typography, makeStyles } from "@material-ui/core"

import markdownToHTML from "./MarkdownProcessor.js"
import { Fragment } from 'react';

const useStyles = makeStyles({
    root: {
        overflowWrap: "anywhere",
        whiteSpace: "pre-line"
    }
})

const Preview = (props) => {
    const innerEl = useRef(null)
    useEffect(() => { 
        innerEl.current.innerHTML = markdownToHTML(props.body, props.media) 
    })

    const classes = useStyles()
    return (
        <Fragment>
            <h1>{props.title}</h1>
            <Typography 
                align='left' 
                ref={innerEl} 
                className={classes.root} 
            />
        </Fragment>
        
    );
};
export default Preview;