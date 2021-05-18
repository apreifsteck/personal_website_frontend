import React, { useRef } from 'react';

const Form = ({onSubmit, children, ...props}) => {
    const formRef = useRef()

    const onSubmitWrapper = (e) => {
        e.preventDefault()
        
    }

    return (
        <form ref={formRef}>
            {children.map((child) => {
                return {...child, props: {...child.props, formRef: formRef}}
            })}
        </form>
    );
};
export default Form;