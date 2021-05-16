import React, {useState } from 'react'
import { useAuth, actions } from '../../hocs/contexts/authContext'
import { createSession } from '../../API/Auth'

import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'

import LoadingBackdrop from '../../components/UI/LoadingBackdrop'

const useStyles = makeStyles((theme) => ({
    accountIcon: {
        width: "300px",
        height: "300px",
        opacity: .2,
    }
}))

const Login = (props) => {
    const classes = useStyles()

    const [, authActions] = useAuth()

    const [pass, setPass] = useState("")
    const [uname, setUname] = useState("")
    const [loading, setLoading] = useState(false)
    const [failedAttempt, setFailedAttempt] = useState(false)

    const loginHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        createSession(uname, pass)
        .then(resp => {
            setLoading(false)
            setFailedAttempt(false)
            // authActions.createSession(resp.data.data)
            authActions({type: actions.CREATE_SESSION, uname: uname, ...resp.data.data})
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            setFailedAttempt(true)
        })
    }

    return (  
        <form onSubmit={loginHandler}>
            <LoadingBackdrop open={loading}/>
            <Grid container justify="center" direction="column" spacing={2}>
                <Grid item>
                    <img className={classes.accountIcon} src="account_circle_48px.svg" alt="Account Icon" />
                </Grid>
                <Grid item>
                    <TextField 
                        variant="outlined" 
                        label="Username"
                        id="uname"
                        onChange={(e) => setUname(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        variant="outlined" 
                        label="Password"
                        id="pass" 
                        type="password"
                        onChange={(e) => setPass(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </Grid>
                {failedAttempt && 
                <Grid item>
                    <Typography>Invalid Credentials</Typography>
                </Grid>}
            </Grid>
        </form>
    )
}

export default Login