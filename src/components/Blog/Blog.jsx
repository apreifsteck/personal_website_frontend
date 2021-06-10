import React, { useEffect, useReducer, useState, useLayoutEffect, useRef } from "react";
import { Button, Container, Switch } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import UploadsDialog from "./UploadsDialog/UploadsDialog"

import Form from '../UI/Form/Form'
import API from '../../API/API'

import Editor from "./Editor/Editor";
import Preview from "./Preview/Preview";


// TODO: Cache the post in the browser so it can persist through a page reload.
// Maybe set a timer so that the cache will refresh if the component is still mounted
// or delete the cache if it is not.

const initialState = {
	title: "Some Title",
	body: "## A Subheading\n\n And some text",
	media: [],
	isPreview: false,
	cursor: 0,
	editStack: []
}

const reducer = (state, action) => {
	switch(action.type) {
		case 'UPDATE_TITLE':
			return {...state, title: action.payload}
		case 'ADD_TO_BODY':
			return {
				...state, 
				body: action.payload, 
				cursor: action.cursorPos,
				editStack: [action.payload, ...state.editStack]
			}
		case 'MOVE_CURSOR': 
			return {
				...state,
				cursor: action.cursorPos
			}
		case 'UNDO':
			const [lastBody, ...remainingStack] = state.editStack
			console.log(remainingStack)
			return {
				...state,
				body: lastBody,
				editStack: [...remainingStack]
			}
		case 'UPDATE_MEDIA':
			return {...state, media: action.payload}
		case 'TOGGLE_PREVIEW':
			return {...state, isPreview: !state.isPreview}
		default:
			throw new Error()
	}
}

const imgInsertString = (url) => `[img](${url})`

const Blog = (props) => {
	const editorRef = useRef()
	const [state, dispatch] = useReducer(reducer, initialState)
	const [showImgDialog, setShowImgDialog] = useState(false)

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.focus()
			editorRef.current.selectionStart = editorRef.current.selectionEnd = state.cursor
		}
	}, [state.body, state.cursor])

	const handlePaste = (event) => {
		event.preventDefault()
		const cursorPos = event.target.selectionStart
		// TODO: preserve undo		
		console.log(event.clipboardData.getData("file"))
		const items = event.clipboardData.items
		for (var item of items) {
			if (item.kind === "file") {
				const blob = item.getAsFile();
				const reader = new FileReader();
				reader.onload = (loaded_event) => {
					const imgAsString = loaded_event.target.result
					const hash = imgAsString.substr(imgAsString.length - 20, imgAsString.length);
					API.uploadImage(hash, "", blob)
					.then((resp) => {
						const media = [...state.media]
						media.push(resp.data.data)
						dispatch({type: 'UPDATE_MEDIA', payload: media})
						
						const imgsrc = imgInsertString(API.prefixImgPath(resp.data.data.url))
						const newBody = state.body.slice(0, cursorPos) + imgsrc + state.body.slice(cursorPos)
						dispatch({type: 'ADD_TO_BODY', payload: newBody, cursorPos: state.cursor + imgsrc.length})
						
					})
					.catch(err => console.log(err))
				}
				reader.readAsDataURL(blob)
			} else {
				// console.log(item.getAsString())
				// dispatch({type: "ADD_TO_BODY", payload: item.})
			}
		}
	}

	const onInsertImage = (picture) => {
		if (editorRef.current !== null){
			const imgString = imgInsertString(picture.src)
			const newBody = (
				state.body.slice(0, state.cursor) +
				imgString +
				state.body.slice(state.cursor)
				)
			
			// editorRef.current.selectionStart = state.cursor + imgString.length
			dispatch({type: "ADD_TO_BODY", payload: newBody, cursorPos: state.cursor + imgString.length})
			
		}
	}

	const onUndo = () => dispatch({type: "UNDO"})

	const onSubmit = () => {
		API.submitPost(state.title, state.body, Array.map(state.media, (pic) => pic.id))
	}

	return( 
		<Container>
				<UploadsDialog 
				open={showImgDialog} 
				onClose={() => setShowImgDialog(false)}
				onPicClick={onInsertImage}
				/>
				<Grid container direction='column' spacing={3}>
					<Grid item container alignItems="center">
						<Grid item>
							<Typography>Preview</Typography>
						</Grid>
						<Grid item>
							<Switch checked={state.isPreview} onChange={() => dispatch({type: 'TOGGLE_PREVIEW'})} />
						</Grid>
						<Grid item>
							{!state.isPreview && <Button onClick={() => setShowImgDialog(true)} variant="outlined" color="secondary">
								Uploads
							</Button>}
						</Grid>
					</Grid>
					{/* <Grid container full>  */}
						<Form onSubmit={onSubmit}>
							<Grid item xs={11} md={10} >
									{state.isPreview ?
										<Preview title={state.title} body={state.body} /> :
										<Editor
											body={state.body}
											title={state.title}
											title_change={(payload) => dispatch({type: 'UPDATE_TITLE', payload: payload})}
											body_change={(payload, cursorPos) => dispatch({type: 'ADD_TO_BODY', payload: payload, cursorPos: cursorPos})}
											onClick={(cursorPos) => dispatch({type: 'MOVE_CURSOR', cursorPos: cursorPos})}
											paste={handlePaste}
											onUndo={onUndo}
											ref={editorRef}
									/>}
							</Grid>
							<Grid container item >
								<Button variant='contained' color='primary' type="submit" style={{marginTop: "20px"}}>Submit</Button>
							</Grid>
						</Form>
					{/* </Grid> */}
			</Grid >
		</Container>
	)

};
export default Blog;
