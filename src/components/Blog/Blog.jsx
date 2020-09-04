import React, { useState } from "react";

import { Switch, TextField } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

import Editor from "./Editor/Editor";
import Preview from "./Preview/Preview";



const Blog = (props) => {
	const [text, updateText] = useState("1. For the money\n2. For the show");
	const [media, updateMedia] = useState([])
	const [isPreview, togglePreview] = useState(false);

	const handleChange = (event) => {
		// console.log(event.type)
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
					media.push(loaded_event.target.result)
					updateMedia(media)
					updateText(text + `[img](${media.length - 1})`)
				}
				reader.readAsDataURL(blob)
			}
			// Not tryna fug with putting any html directly in the editor.
			else if (item.type === "text/plain") {
				item.getAsString(clippedString => updateText(text + clippedString))
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
