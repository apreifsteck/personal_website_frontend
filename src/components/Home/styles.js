import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	panel_top: {
		height: "103vh",
		width: "inherit",
	},
	panel_bottom: {
		height: "80vh",
	},
	paper: {
		width: "100%",
		height: "100%",
		color: "white",
		backgroundColor: theme.palette.primary.main,
		paddingTop: "40px",
	},
	buttons: {
		marginTop: "4em",
	},
	gridList: {
		padding: "20px 0 40px",
	},
	gridItem: {
		width: 200,
	},
}));

export default useStyles;
