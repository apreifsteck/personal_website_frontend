import React, {Fragment, useEffect, useState} from 'react';
import AxiosLib from 'axios'
import axios from '../../axios'

import { useAuth, actions } from '../contexts/authContext'
import ErrorModal from '../UI/Modal/ErrorModal'
import { Typography } from '@material-ui/core';
import API from '../../API/API';
import { useHistory } from 'react-router';
import routes from '../../routes';

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
                    setError(err)
                } 
                else if (err.response !== undefined && err.response.status === 401) {
                    if(authState.accessToken && err.response.headers["cache-control"].includes("must-revalidate")) {
                        escapeHatch.post(
                            "/auth/session/renew", {}, {headers: {'authorization': authState.refreshToken}})
                        .then(resp => {
                            authDispatch({type: actions.REFRESH_SESSION, ...resp.data.data})
                            const retryRequest = {...error.response.config}
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