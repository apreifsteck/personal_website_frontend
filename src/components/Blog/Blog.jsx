import React, { useState } from "react";

import { Switch, TextField } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

import Editor from "./Editor/Editor";
import Preview from "./Preview/Preview";



const Blog = (props) => {
	const [text, updateText] = useState("");
	const [media, updateMedia] = useState({})
	const [isPreview, togglePreview] = useState(false);

	const handleChange = (event) => {
		updateText(event.target.value)
	}

	const handlePaste = (event) => {
		// TODO: preserve undo		
		const items = event.clipboardData.items
		for (var item of items) {
			if (item.kind === "file") {
				const blob = item.getAsFile();
				const reader = new FileReader();
				reader.onload = (loaded_event) => {
					const result = loaded_event.target.result
					const hash = result.substr(result.length - 20, result.length);
					media[hash] = result
					updateMedia(media)
					updateText(text + `[img](${hash})`)
				}
				reader.readAsDataURL(blob)
			}
		}
	}

	return <Grid container >
		<Grid container>
			<Grid item>
				<Typography>Preview</Typography>
			</Grid>
			<Grid item>
				<Switch checked={isPreview} onChange={() => togglePreview(!isPreview)} />
			</Grid>
		</Grid>

		<Grid item xs={11}>
			{isPreview ?
				<Preview text={text} media={media} /> :
				<Editor
					text={text}
					changed={handleChange}
					paste={handlePaste}
				/>}
		</Grid>

	</Grid >

};
export default Blog;
