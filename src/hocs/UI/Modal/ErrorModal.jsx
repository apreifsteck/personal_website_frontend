import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core';

const ErrorModal = (props) => {
    const [open, updateOpen] = useState(true)
    const handleClose = () => updateOpen(false)

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle >Computer Machine Commit Die</DialogTitle>
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
export default ErrorModal;