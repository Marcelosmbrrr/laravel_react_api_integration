import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

export function RealTimeChat() {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Chat">
                <IconButton variant="contained" onClick={handleOpen}>
                    <ChatIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    REAL TIME CHAT
                </DialogTitle>
                <Divider />

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        * Chat here *
                    </DialogContentText>
                </DialogContent>

                <Divider />
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
