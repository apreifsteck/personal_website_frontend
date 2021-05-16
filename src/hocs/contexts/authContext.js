import React, { useContext, useEffect, useReducer } from "react"

const initialState = {
	accessToken: localStorage.getItem("accessToken") || null,
	refreshToken: localStorage.getItem("refreshToken") || null,
	uname: localStorage.getItem("uname") || null,
}

export const AuthContext = React.createContext(initialState)

export const actions = {
	CREATE_SESSION: "CREATE_SESSION",
	DELETE_SESSION: "DELETE_SESSION",
	REFRESH_SESSION: "REFRESH_SESSION"
}

const authReducer = (state, action) => {
	switch(action.type) {
		case actions.CREATE_SESSION:
			return {accessToken: action.accessToken, refreshToken: action.refreshToken, uname: action.uname}
		case actions.DELETE_SESSION:
			return {accessToken: null, refreshToken: null, uname: null}
		case actions.REFRESH_SESSION:
			return {...state, accessToken: action.accessToken, refreshToken: action.refreshToken}
		default:
			return state
	}
}

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
	const [state, dispatch] = useReducer(authReducer, initialState)
	useEffect(() => {
		for (const [k, v] of Object.entries(state)) {
			if (typeof(v) === "string") { localStorage.setItem(k, v) }
		}
	}, [state])
	
	return (
		<AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>
	)
}



// export const useAuth = () => {
// 	const [authContext, setAuthContext] = useContext(AuthContext)
// 	const [authState, dispatch] = useReducer(authReducer, authContext)
// 	useEffect(() => {
// 		setAuthContext(authState)

// 		for (const [k, v] of Object.entries(authState)) {
// 			if (typeof(v) === "string") { localStorage.setItem(k, v) }
// 		}
// 	}, [authState, setAuthContext])
// 	return [authState, {
// 		createSession: (sessionInfo) => dispatch({type: actions.CREATE_SESSION, ...sessionInfo}),
// 		deleteSession: () => dispatch({type: actions.DELETE_SESSION}),
// 		refreshSession: (sessionInfo) => dispatch({type: actions.REFRESH_SESSION, ...sessionInfo})
// 	}]
// }