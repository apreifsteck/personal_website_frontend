import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import RequestInterceptors from './hocs/Utils/RequestInterceptors'

import Layout from "./hocs/Layout/Layout";
import routes from './routes'


import "./App.css";

function App() {
	const componentRoutes = Object.entries(routes).map(([key, {path, component}]) => (
		<Route exact path={path} key={key} component={component} />
	))

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<RequestInterceptors>
						<Layout>
							<Switch>
								{componentRoutes}
							</Switch>
						</Layout>
					</RequestInterceptors>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
