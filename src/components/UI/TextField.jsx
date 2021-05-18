import React, { useEffect, useState } from 'react';

import {TextField as MaterialTextField} from '@material-ui/core'
import { useForm } from './Form';

const TextField = ({children, onChange, validations, value, ...others}) => {
    const [err, changeEvent] = useForm(validations, onChange, value)
    // const [err, setErr] = useState(false)
    // const formRef = useForm()
    // console.log(formRef)
    // useEffect(() => {
    //     if (formRef) {
    //         formRef.current.addEventListener("submit", () => {
    //             console.log("trapped the submit event")
    //             wrapperChange({target: {value: value}})
    //         }, true)
    //     }
    // }, [formRef])
    
    // const wrapperChange = (e) => {
    //     if (validation && !Array.isArray(validation)) {
    //       validation = [validation]  
    //     } 
    //     console.log(validation)
    //     if (validation) {
    //         const results = validation.map((validationFunc) => validationFunc(e.target.value))
    //         for (const res of results) {
    //             if (res.failed) {
    //                 formRef.current.valid = false
    //                 setErr(res)
    //                 break
    //             }
    //             setErr(false)
    //             formRef.current.valid === undefined ? 
    //             formRef.current.valid = true :
    //             formRef.current.valid = formRef.current.valid && true
    //         }
    //     }
        
    //     onChange(e)
    // }
    // const changeEvent = onChange ? wrapperChange : undefined
    
    
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