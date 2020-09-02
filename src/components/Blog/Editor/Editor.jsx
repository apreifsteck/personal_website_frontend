import React, { useState, useCallback } from "react";
import { Grid, TextField, Fab } from "@material-ui/core";
import { FormatItalic, FormatBold, FormatUnderlined } from "@material-ui/icons";


const Editor = (props) => {
	return (
		<TextField
			variant="outlined"
			multiline
			onChange={props.changed}
			onPaste={props.paste}
			fullWidth
			value={props.text}
		/>
	);
};
export default Editor;