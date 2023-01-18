import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
// Axios
import { api as axios } from '../../services/api';
// Context
import { useRefreshTable } from '../../context/RefreshTable';

export const DeleteUser = React.memo((props) => {

    // Contexts
    const { refreshTable } = useRefreshTable();
    // Local states
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({ display: false, type: "", message: "" });

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    async function requestServer() {

        setLoading(true);

        try {

            const token = localStorage.getItem('access_token');

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            const response = await axios.delete("http://localhost:8000/api/v1/user/" + props.formData.id, headers)

            setAlert({ display: true, type: "success", message: response.data.message });

            setTimeout(() => {
                refreshTable();
                handleClose();
            }, 2000);

        } catch (error) {

            setAlert({ display: true, type: "success", message: error.response.data.message });

        } finally {

            setLoading(false);

        }

    }

    return (
        <>
            <Tooltip title="Desactivate User">
                <IconButton variant="contained" onClick={handleOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Deactivation</DialogTitle>
                <Divider />

                <DialogContent>
                    <DialogContentText mb={1}>
                        The deactivation is not permanent and can be reserved. A disabled user cant access the system.
                    </DialogContentText>
                </DialogContent>

                <Divider />
                {loading && <LinearProgress />}
                {alert.display && <Alert severity={alert.type}>{alert.message}</Alert>}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={requestServer} color='error'>Deactivate</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});