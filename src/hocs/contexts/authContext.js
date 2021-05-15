import React from "react"

export const storeAuthState = (stateMutator, newState) => {
	stateMutator(newState)
	for (const [k, v] of Object.entries(newState)) {
		localStorage.setItem(k, v)
	}
}

export const initialAuthState = {
    accessToken: null,
    refreshToken: null,
    uname: null,
    storeSessionInfo: (uname, accToken, refreshToken) => {
		return {
			accessToken: accToken, 
			refreshToken: refreshToken, 
			uname: uname
		}
	}
}

export const AuthContext = React.createContext(initialAuthState)