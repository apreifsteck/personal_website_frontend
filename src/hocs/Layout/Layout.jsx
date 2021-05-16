import React from "react";

import { Grid } from "@material-ui/core";

import Navbar from "../../components/Navigation/Navbar/Navbar";

const Layout = (props) => {
	return (
		// <div style={{padding: 10}}>
			<Grid container direction="column" spacing={0} id="parentGrid">
				<Grid item xs={12}>
					<Navbar />
				</Grid>
				<Grid item xs={12}>
					{props.children}
				</Grid>
			</Grid>
		//  </div>
	);
};
export default Layout;
