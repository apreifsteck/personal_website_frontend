import { makeStyles } from "@material-ui/core/styles";

const timing = "300ms";
export const animationDuration = parseFloat(timing.slice(0, timing.length - 2));

const useStyles = makeStyles((theme) => ({
	profilePic: {
		borderRadius: "50%",
		width: "250px",
		height: "250px",
	},
	flipImage: {
		animation: `$flip ${timing} ${theme.transitions.easing.easeOut} forwards`,
	},
	unflipImage: {
		animation: `$unflip ${timing} ${theme.transitions.easing.easeOut} forwards`,
	},
	"@keyframes flip": {
		// "0%": {
		// 	transform: "scale(1,1)",
		// },
		// "50%": {
		// 	transform: "scale(0, 0)",
		// },
		// "100%": {
		// 	transform: "scale(1, 1)",
		// },
		from: {
			transform: "rotateY(-180deg)",
		},
		to: {
			transform: "rotateY(0deg)",
		},
	},
	"@keyframes unflip": {
		// "0%": {
		// 	transform: "scale(1,1)",
		// },
		// "50%": {
		// 	transform: "scale(0, 0)",
		// },
		// "100%": {
		// 	transform: "scale(1, 1)",
		// },
		from: {
			transform: "rotateY(180deg)",
		},
		to: {
			transform: "rotateY(0deg)",
		},
	},
}));

export default useStyles;
