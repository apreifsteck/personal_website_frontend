import React from "react";
import { Grid, Fab } from "@material-ui/core";
import { FormatItalic, FormatBold, FormatUnderlined } from "@material-ui/icons";

const EditButtons = (props) => {
	return (
		<React.Fragment>
			<Fab>
				<FormatItalic />
			</Fab>
			<Fab>
				<FormatBold />
			</Fab>
			<Fab>
				<FormatUnderlined />
			</Fab>
		</React.Fragment>
	);
};
export default EditButtons;
