import React from "react";
import { TextField, makeStyles, Grid} from "@material-ui/core";

const useStyles = makeStyles({
    code: {
        fontFamily: [
			'Consolas',
			'Monaco',
			'"Lucida Console"',
			'"Liberation Mono"',
			'"DejaVu Sans Mono"',
			'"Bitstream Vera Sans Mono"',
			'"Courier New"'
		].join(",")
    }
})


const Editor = React.forwardRef((props, ref) => {
	const handleUndo = (e) => {
		if(e.keyCode === 91) {
			// console.log("undoing");
			props.onUndo()
		}
	}

	const classes = useStyles()
	return (
		<Grid container direction='column' spacing={3}>
			<Grid  container item>
				<TextField 
					label="Title" 
					variant='outlined'
					value={props.title}
					onChange={(e) => props.title_change(e.target.value)} />			
			</Grid>

			<Grid item>
				<TextField
					variant="outlined"
					label="Post"
					InputProps={{
						classes: {
							input: classes.code
						}
					}}
					multiline
					onChange={(e) => props.body_change(e.target.value, e.target.selectionStart)}
					onClick={(e) => props.onClick(e.target.selectionStart)}
					onPaste={props.paste}
					fullWidth
					value={props.body}
					onKeyUp={handleUndo}
					inputRef={ref}
				/>
			</Grid>
		</Grid>
	);
});
export default Editor;