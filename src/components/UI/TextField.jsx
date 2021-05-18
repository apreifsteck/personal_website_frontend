import React, { useEffect, useRef, useState } from 'react';

import {TextField as MaterialTextField} from '@material-ui/core'

const TextField = ({children, onChange, validation, formRef, value, ...others}) => {
    const [err, setErr] = useState(false)
    useEffect(() => {
        if (formRef) {
            formRef.current.addEventListener("submit", () => {
                console.log("trapped the submit event")
                wrapperChange({target: {value: value}})
            }, true)
        }
    })
    
    const wrapperChange = (e) => {
        if (!Array.isArray(validation)) {
          validation = [validation]  
        } 
        const results = validation.map((validationFunc) => validationFunc(e.target.value))
        for (const res of results) {
            if (res.failed) {
                formRef.current.valid = false
                setErr(res)
                break
            }
            setErr(false)
            formRef.current.valid === undefined ? 
            formRef.current.valid = true :
            formRef.current.valid = formRef.current.valid && true
        }
        onChange(e)
    }
    const changeEvent = onChange ? wrapperChange : undefined
    
    
    return (
        <MaterialTextField 
        {...others} 
        onChange={changeEvent} 
        error={err.failed} 
        helperText={err.helperText}
        >{children}</MaterialTextField>        
    );
};
export default TextField;