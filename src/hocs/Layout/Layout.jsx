import React from "react";

import { Grid } from "@material-ui/core";

import Navbar from "../../components/Navigation/Navbar/Navbar";

const Layout = (props) => {
	return (
		<Grid container direction="column" spacing={4}>
			<Grid item xs={12}>
				<Navbar />
			</Grid>
			<Grid item xs={12}>
				{props.children}
			</Grid>
		</Grid>
	);
};
export default Layout;
