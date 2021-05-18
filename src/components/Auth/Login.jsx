import React, {useState } from 'react'
import { useAuth, actions } from '../../hocs/contexts/authContext'
import API from '../../API/API'

import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'

import LoadingBackdrop from '../../components/UI/LoadingBackdrop'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
    accountIcon: {
        width: "300px",
        height: "300px",
        opacity: .2,
    }
}))

const Login = (props) => {
    let history = useHistory()
    const classes = useStyles()

    const [, authActions] = useAuth()

    const [pass, setPass] = useState("")
    const [uname, setUname] = useState("")
    const [loading, setLoading] = useState(false)
    const [failedAttempt, setFailedAttempt] = useState(false)

    const loginHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        API.createSession(uname, pass)
        .then(resp => {
            setLoading(false)
            setFailedAttempt(false)
            authActions({type: actions.CREATE_SESSION, uname: uname, ...resp.data.data})
            history.push("/")
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