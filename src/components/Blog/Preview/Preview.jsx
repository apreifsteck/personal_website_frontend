import React, { useRef, useEffect } from 'react';

import { TextField, Typography } from "@material-ui/core"

import markdownToHTML from "./MarkdownProcessor.js"

const Prview = (props) => {
    const innerEl = useRef(null)
    useEffect(() => { innerEl.current.innerHTML = markdownToHTML(props.text, props.media) })
    return (
        <Typography ref={innerEl}>

        </Typography>
    );
};
export default Prview;