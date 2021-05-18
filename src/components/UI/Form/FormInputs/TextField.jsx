import React from 'react';

import {TextField as MaterialTextField} from '@material-ui/core'
import { useForm } from '../Form';

const TextField = ({children, onChange, validations, value, ...others}) => {
    const [err, changeEvent] = useForm(validations, onChange, value, "text")
    
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