import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
// Axios
import { api as axios } from '../../services/api';
// Context
import { useRefreshTable } from '../../context/RefreshTable';

const initialFormData = { name: '', email: '', password: '' }
const initialFormError = { name: { error: false, message: '' }, email: { error: false, message: '' }, password: { error: false, message: '' } }
const initialAlert = { display: false, type: "", message: "" }

const formValidation = {
    name: {
        test: (value) => value != null && value.length >= 3,
        message: 'Name must have at least 3 letters.'
    },
    email: {
        test: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        message: 'Email invalid.'
    },
    password: {
        test: (value) => value != null && value.length > 0,
        message: "Password must be informed and have at least 10 characters."
    }
}

export function CreateUser() {

    // Contexts
    const { refreshTable } = useRefreshTable();
    // Local states
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(initialAlert);
    const [formData, setFormData] = React.useState(initialFormData);
    const [formError, setFormError] = React.useState(initialFormError);

    function handleOpen() {
        setOpen(true);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setAlert(initialAlert);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSubmit() {

        let errors = Object.assign({}, formError);
        for (let field in formData) {
            if (!formValidation[field].test(formData[field])) {
                errors[field].error = true;
                errors[field].message = formValidation[field].message;
            } else {
                errors[field].error = false;
                errors[field].message = '';
            }
        }

        setFormError(errors);

        if (formError.email.error || formError.password.error) return '';

        requestServer();

    }

    async function requestServer() {

        setLoading(true);

        try {

            const token = localStorage.getItem('authtoken');

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, formData, { headers });

            setAlert({ display: true, type: "success", message: response.data.message });

            setTimeout(() => {
                refreshTable();
                handleClose();
            }, 2000);

        } catch (error) {

            setAlert({ display: true, type: "error", message: error.response.data.message });

        } finally {

            setLoading(false);

        }

    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.currentTarget.value });
    }

    return (
        <>
            <Tooltip title="Add User">
                <IconButton variant="contained" onClick={handleOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Creation</DialogTitle>
                <Divider />

                <DialogContent>
                    <DialogContentText mb={1}>
                        The user created will receive an email with the credentials.
                    </DialogContentText>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formData.name}
                                error={formError.name.error}
                                helperText={formError.name.message}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={formData.email}
                                error={formError.email.error}
                                helperText={formError.email.message}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                error={formError.password.error}
                                helperText={formError.password.message}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                {loading && <LinearProgress />}
                {alert.display && <Alert severity={alert.type}>{alert.message}</Alert>}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
