import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tooltip from '@mui/material/Tooltip';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
// Styled
import styled from 'styled-components';
import { Typography } from '@mui/material';

const ChatContainer = styled.div`
  width: 100%;
  min-height: 400px;
`;

const ChatRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1px;
`;

const ChatRowAvatar = styled.div`
    flex-basis: 'fit-content';
    margin-right: 5px;
`;

const ChatRowPersonName = styled.div`
    flex-grow: 1;
    margin-right: 5px;
`;

const ChatRowMessage = styled.div`
    flex-grow: 1;
`;

export function RealTimeChat() {

    const [open, setOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [connected, setConnected] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);

        if (connected) return '';

        // Artificial loading
        setTimeout(() => {
            setConnected(true);
            setMessages([
                { name: 'You', avatar: 'Y', message: 'You are online now!' }
            ]);
        }, 3000);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function renderMessages() {

        // Not connected
        if (!connected) {

            return <Typography>Connecting...</Typography>

        } else if (connected) {
            return (
                <>
                    <ChatRow>
                        <Box sx={{ display: 'flex' }}>
                            <ChatRowAvatar>
                                <PersonIcon color='success' />
                            </ChatRowAvatar>
                            <ChatRowPersonName>
                                {messages[0].name}
                            </ChatRowPersonName>
                        </Box>
                        <ChatRowMessage>
                            {messages[0].message}
                        </ChatRowMessage>
                    </ChatRow>
                </>
            )
        }
    }

    return (
        <>
            <Tooltip title="Chat">
                <Badge color={connected ? "success" : "error"} variant="dot">
                    <IconButton variant="contained" onClick={handleOpen}>
                        <ChatIcon />
                    </IconButton>
                </Badge>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <DialogContentText>

                        <Stack spacing={3}
                            sx={{ overflowY: 'scroll', minHeight: '400px' }}
                        >
                            {renderMessages()}
                        </Stack>

                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
