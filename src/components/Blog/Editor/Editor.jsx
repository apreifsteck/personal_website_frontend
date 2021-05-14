import React, { useState, useCallback } from "react";
import { TextField, makeStyles, Grid} from "@material-ui/core";
import { Fragment } from "react";

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

const Editor = (props) => {
	const classes = useStyles()
	return (
		<Grid container direction='column' spacing={3}>
			<Grid  container item>
				<TextField 
					label="Title" 
					variant='outlined' 
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
					onChange={(e) => props.body_change(e.target.value)}
					onPaste={props.paste}
					fullWidth
					value={props.body}
				/>
			</Grid>
		</Grid>
	);
};
export default Editor;