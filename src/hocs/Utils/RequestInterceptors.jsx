import React, {Fragment, useEffect, useState} from 'react';
import AxiosLib from 'axios'
import axios from '../../axios'

import { useAuth, actions } from '../contexts/authContext'
import ErrorModal from '../UI/Modal/ErrorModal'
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import routes from '../../routes';

/**
 * TODO: There's a bug with the redirect to login page when your session expires.
 * If you send a bunch of concurrent requests and your session is expired all those redirects get 
 * pushed on to the history stack and you have to login like a dozen times to get rid of them.
 *  */ 

const escapeHatch = AxiosLib.create({ baseURL: process.env.REACT_APP_BACKEND_URL})

const Interceptors = (props) => {
    let history = useHistory()
    const [authState, authDispatch] = useAuth()
    const [error, setError] = useState(false)

    useEffect(() => {
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(false)
            req.headers['authorization'] = authState.accessToken
            return req
        })
        const respInterceptor = axios.interceptors.response.use(resp => resp, 
            (err) => {
                if (err.response !== undefined && err.response.status !== 401) {
                    console.log(Object.entries(err))
                    setError(err)
                } 
                else if (err.response !== undefined && err.response.status === 401) {
                    if(authState.accessToken && err.response.headers["cache-control"].includes("must-revalidate")) {
                        escapeHatch.post(
                            "/auth/session/renew", {}, {headers: {'authorization': authState.refreshToken}})
                        .then(resp => {
                            authDispatch({type: actions.REFRESH_SESSION, ...resp.data.data})
                            const retryRequest = {...err.response.config}
                            retryRequest.headers['authorization'] = resp.data.data.accessToken
                            return axios.request(retryRequest)
                        })
                        .catch(err => {
                            if (err.response !== undefined && err.response.status === 401) {
                                history.push(routes.login.path, {timeout: true})
                            }
                        })
                    }
                }
                else {
                    return err
                }
        })

        return () => {
            axios.interceptors.request.eject(reqInterceptor)
            axios.interceptors.response.eject(respInterceptor)
        }
    }, [authState.accessToken, authState.refreshToken, authDispatch, history])
    

    return (
        <Fragment>
            {error &&
            <ErrorModal>
                <Typography>
                    {error.message}
                </Typography>
                {error.response.data !== undefined ? <Typography>{JSON.stringify(error.response.data)}</Typography>: null}
            </ErrorModal>}
            {props.children}
        </Fragment>
    );
};
export default Interceptors;