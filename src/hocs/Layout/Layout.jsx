import React from "react";

import { Container, Grid, makeStyles } from "@material-ui/core";

import Navbar from "../../components/Navigation/Navbar/Navbar";
import RouterBreadcrumbs from "../../components/Navigation/Breadcrumbs/RouterBreadcrumbs";

const useStyles = makeStyles((theme) => ({
	guttersBottom: {
		marginBottom: "15px"
	},
	bigGuttersBottom: {
		marginBottom: "20px"
	}
}))

const Layout = (props) => {
	const classes = useStyles()
	return (
		<Grid container direction="column" spacing={0} id="parentGrid">
			<Grid item xs={12} className={classes.bigGuttersBottom}>
				<Navbar />
			</Grid>
			<Grid item className={classes.guttersBottom}>
				<Container>
					<RouterBreadcrumbs />
				</Container>
			</Grid>
			<Grid item xs={12}>
				{props.children}
			</Grid>
		</Grid>
	);
};
export default Layout;
