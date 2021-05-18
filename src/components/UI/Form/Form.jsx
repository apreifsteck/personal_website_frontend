import React, { useContext, useRef, useState, useEffect, useReducer, useCallback } from 'react';

const FormContext = React.createContext()

export const useForm = (validations, onChangeFunc, fieldValue, type) => {
    const [formDispatch, formRef] = useContext(FormContext)
    
    const [helperText, setHelperText] = useState("")
    const [err, setErr] = useState(false)

    const validate = useCallback((value) =>{
        let validatorFuncs = validations
        if (validatorFuncs && !Array.isArray(validatorFuncs)) {
          validatorFuncs = [validatorFuncs]  
        } 
        if (validatorFuncs) {
            const results = validatorFuncs.map((validationFunc) => validationFunc(value))
            // Loop through the results of the validation checks
            for (const res of results) {
                if (res.failed) {
                    setErr(res.failed)
                    setHelperText(res.helperText)
                    break
                }
                setErr(false)
                setHelperText("")        
            }
        }
    }, [validations])

    const wrapperChange = (e) => {
        switch(type) { 
            case "img": 
                validate(e.target.files)
                break;
            case "text":
                validate(e.target.value)
                break;
            default:
                throw new Error("Did not pass valid type to useForm hook")
        }
        onChangeFunc(e)
    }
    const changeEvent = onChangeFunc ? wrapperChange : undefined
    
    useEffect(() => {
        const refCopy = formRef.current
        const submitListenerCallback = () => {
            validate(fieldValue)
        }
        if (formRef) {
            formRef.current.addEventListener("submit", submitListenerCallback, true)
        }
        return () => refCopy.removeEventListener("submit", submitListenerCallback, true)
    }, [formRef, fieldValue, validate])

    const firstRun = useRef(true)
    useEffect(() => {
        if (!firstRun.current){
            err ? formDispatch({type: "fail"}) : formDispatch({type: "pass"})            
        } else {
            firstRun.current = false
        }
    }, [err, formDispatch])
    

    return [{failed: err, helperText: helperText}, changeEvent]
}

const errReducer = (state, action) => {
    switch (action.type) {
        case "fail":
            return state + 1
        case "pass": 
            return state - 1
        default:
            return state
    }
}

const Form = ({onSubmit, failedValidationCallback, children, ...props}) => {
    const formRef = useRef()
    // const [errs, setErrs] = useState([])
    const [numErrors, dispatch] = useReducer(errReducer, 0)

    const onSubmitWrapper = (e) => {
        e.preventDefault()
        if (numErrors === 0) {
            onSubmit(e)
        } else if(failedValidationCallback !== undefined) {
            failedValidationCallback(e)
        }
    }

    return (
        <form onSubmit={onSubmitWrapper} ref={formRef}>
            <FormContext.Provider value={[dispatch, formRef]}>
                {children}
            </FormContext.Provider>
        </form>
    );
};
export default Form;