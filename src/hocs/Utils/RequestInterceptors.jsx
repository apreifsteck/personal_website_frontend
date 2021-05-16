import React, {Fragment, useContext, useEffect, useState} from 'react';
import axios from '../../axios'

import { useAuth } from '../contexts/authContext'
import ErrorModal from '../UI/Modal/ErrorModal'
import { Typography } from '@material-ui/core';

const Interceptors = (props) => {
    const [authState, ] = useAuth()
    // console.log(authState)
    const [error, setError] = useState(false)

    useEffect(() => {
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(false)
            req.headers['authorization'] = authState.accessToken
            return req
        })
        const respInterceptor = axios.interceptors.response.use(resp => resp, (err) => {
            if (err.response !== undefined && err.response.status !== 401) {
                setError(err)
            } else {
                return err
            }
        })

        return () => {
            axios.interceptors.request.eject(reqInterceptor)
            axios.interceptors.response.eject(respInterceptor)
        }
    }, [authState.accessToken])
    

    return (
        <Fragment>
            {error &&
            <ErrorModal>
                <Typography>
                    {error.message}
                </Typography>
            </ErrorModal>}
            {props.children}
        </Fragment>
    );
};
export default Interceptors;