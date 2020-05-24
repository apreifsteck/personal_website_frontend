import React from "react";

import { Grid, Container } from "@material-ui/core";

import Navbar from "../../components/Navigation/Navbar/Navbar";

const Layout = (props) => {
	return (
		<Grid container direction="column">
			<Grid item xs={12}>
				<Navbar />
			</Grid>
			<Grid container>{props.children}</Grid>
		</Grid>
	);
};
export default Layout;
