import { fade, makeStyles } from "@material-ui/core/styles";

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
	link: {
		textDecoration: "none",
		"&:visited": {
			color: "inherit"
		}
	},
	iconButton: {
		marginTop: "4em",
		backgroundColor: fade("#0000", .035),
		"&:hover, &.Mui-focusVisible": {
			color: theme.palette.primary.light,
			backgroundColor: fade(theme.palette.primary.light, .1)
		}
	},
	touchRipple: {
		color: fade(theme.palette.primary.light, .35)
	},
	gridList: {
		padding: "20px 0 40px",
	},
	gridItem: {
		width: 200,
	},
}));

export default useStyles;
