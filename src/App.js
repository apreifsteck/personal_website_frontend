import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider, Typography } from "@material-ui/core";
import theme from "./theme";

import Layout from "./hocs/Layout/Layout";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";

import "./App.css";

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Layout>
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/aboutMe" component={AboutMe} />
							<Route path="/blog" component={Blog} />
						</Switch>
					</Layout>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
