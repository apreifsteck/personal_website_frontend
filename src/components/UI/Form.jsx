import React, { useContext, useRef, useState, useEffect } from 'react';

const FormContext = React.createContext()

export const useForm = (validations, onChangeFunc, fieldValue) => {
    const formRef = useContext(FormContext)
    const [err, setErr] = useState(false)
    console.log(formRef)
    const submitCallback = () => {
        console.log("trapped the submit event")
        wrapperChange({target: {value: fieldValue}})
    }
    useEffect(() => {
        if (formRef) {
            formRef.current.addEventListener("submit", submitCallback, true)
        }
        return () => formRef.current.removeEventListener("submit", submitCallback, true)
    }, [formRef, fieldValue])
    
    const wrapperChange = (e) => {
        if (validations && !Array.isArray(validations)) {
          validations = [validations]  
        } 
        console.log(validations)
        if (validations) {
            const results = validations.map((validationFunc) => validationFunc(e.target.value))
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
        }
        
        onChangeFunc(e)
    }
    const changeEvent = onChangeFunc ? wrapperChange : undefined

    return [err, changeEvent]
}

const Form = ({onSubmit, failedValidationCallback, children, ...props}) => {
    const formRef = useRef()
    // const [formValid, setFormValid] = useState(true)

    // const updateValid = (newValue) => setFormValid(formValid && newValue)

    const onSubmitWrapper = (e) => {
        e.preventDefault()
        console.log(formRef)
        if (!formRef.current.valid) {
            onSubmit(e)
        } else {
            console.log("form invalid")
            failedValidationCallback(e)
        }
    }

    return (
        <form onSubmit={onSubmitWrapper} ref={formRef}>
            <FormContext.Provider value={formRef}>
                {children}
            </FormContext.Provider>
        </form>
    );
};
export default Form;