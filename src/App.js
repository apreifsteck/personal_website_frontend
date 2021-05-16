import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { AuthProvider } from "./hocs/contexts/authContext"
import RequestInterceptors from './hocs/Utils/RequestInterceptors'

import Layout from "./hocs/Layout/Layout";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import Login from "./components/Auth/Login"

import "./App.css";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<AuthProvider>
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
					</AuthProvider>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
