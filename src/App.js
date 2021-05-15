import React, { useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { AuthContext, storeAuthState } from "./hocs/contexts/authContext"
import RequestInterceptors from './hocs/Utils/RequestInterceptors'

import Layout from "./hocs/Layout/Layout";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import Login from "./components/Auth/Login"

import "./App.css";

function App() {
	const [authState, updateAuthState] = useState({ 
		accessToken: null,
		refreshToken: null,
		uname: null,
		storeSessionInfo: (authState) => storeAuthState(updateAuthState, authState)
	})
	// updateAuthState({...authState, login: (authState) => updateAuthState(authState)})
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<AuthContext.Provider value={authState} >
						<RequestInterceptors>
							<Layout>
								<Switch>
									<Route path="/home" component={Home} />
									<Route path="/aboutMe" component={AboutMe} />
									<Route path="/blog" component={Blog} />
									<Route path="/login" component={Login} />
								</Switch>
							</Layout>
						</RequestInterceptors>
					</AuthContext.Provider>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
