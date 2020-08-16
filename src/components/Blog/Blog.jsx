import React, { useState } from "react";

import { Switch, TextField } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

import Editor from "./Editor/Editor";
import Preview from "./Preview/Preview";



const Blog = (props) => {
	const [text, updateText] = useState("1. For the money\n2. For the show");
	const [isPreview, togglePreview] = useState(false);
	return <Grid container >
		<Grid container>
			<Grid item>
				<Typography>Preview</Typography>
			</Grid>
			<Grid item>
				<Switch checked={isPreview} onChange={() => togglePreview(!isPreview)} />
			</Grid>
		</Grid>

		<Grid item>
			{isPreview ?
				<Preview text={text} /> :
				<Editor
					text={text}
					changed={(event) => updateText(event.target.value)}
				/>}
		</Grid>

	</Grid>

};
export default Blog;
