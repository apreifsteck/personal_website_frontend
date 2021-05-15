import React, { useReducer } from "react";

import { Button, Container, Switch } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";

import Editor from "./Editor/Editor";
import Preview from "./Preview/Preview";

const initialState = {
	title: "",
	body: "",
	media: {},
	isPreview: false
}

const reducer = (state, action) => {
	switch(action.type) {
		case 'UPDATE_TITLE':
			return {...state, title: action.payload}
		case 'UPDATE_BODY':
			return {...state, body: action.payload}
		case 'UPDATE_MEDIA':
			return {...state, media: action.payload}
		case 'TOGGLE_PREVIEW':
			return {...state, isPreview: !state.isPreview}
		default:
			throw new Error()
	}
}

const Blog = (props) => {

	const [state, dispatch] = useReducer(reducer, initialState)

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
					const media = {...state.media}
					media[hash] = result
					dispatch({type: 'UPDATE_MEDIA', payload: media})
					dispatch({type: 'UPDATE_BODY', payload: state.body + `[img](${hash})`})
				}
				reader.readAsDataURL(blob)
			}
		}
	}

	return( 
		<Container>
				<Grid container direction='column' spacing={3}>
					<Grid item container>
						<Grid item>
							<Typography>Preview</Typography>
						</Grid>
						<Grid item>
							<Switch checked={state.isPreview} onChange={() => dispatch({type: 'TOGGLE_PREVIEW'})} />
						</Grid>
					</Grid>

					<Grid item xs={11} md={10} >
							{state.isPreview ?
								<Preview title={state.title} body={state.body} media={state.media} /> :
								<Editor
									body={state.body}
									title_change={(payload) => dispatch({type: 'UPDATE_TITLE', payload: payload})}
									body_change={(payload) => dispatch({type: 'UPDATE_BODY', payload: payload})}
									paste={handlePaste}
							/>}
					</Grid>
					<Grid item container>
						<Button variant='contained' color='primary'>Submit</Button>
					</Grid>
			</Grid >
		</Container>
	)

};
export default Blog;
