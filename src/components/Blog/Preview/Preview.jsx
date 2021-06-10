import React, { useRef, useEffect } from 'react';

import {  Typography, makeStyles } from "@material-ui/core"

import markdownToHTML, {processText} from "./MarkdownProcessor.js"
import { Fragment } from 'react';

const useStyles = makeStyles({
    root: {
        overflowWrap: "anywhere",
        whiteSpace: "pre-line",
        textAlign: "left",
        "& img": {
            maxWidth: "50%",
            maxHeight: "50%",
            display: "block", 
            marginLeft: "auto",
            marginRight: "auto"
        }
    }
})

const Preview = (props) => {
    const innerEl = useRef(null)
    useEffect(() => { 
        innerEl.current.innerHTML = markdownToHTML(props.body) 
    })

    const classes = useStyles()
    return (
        <Fragment>
            <h1>{props.title}</h1>
            <div 
                ref={innerEl} 
                className={classes.root} 
            />
        </Fragment>
        
    );
};
export default Preview;