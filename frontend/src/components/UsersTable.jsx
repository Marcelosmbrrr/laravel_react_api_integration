import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
// Axios
import { api as axios } from '../services/api';
// Custom
import { UpdateUser } from './Modal/UpdateUser';
import { DeleteUser } from './Modal/DeleteUser';
import { useRefreshTable } from '../context/RefreshTable';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Nome',
        flex: 1,
        minWidth: 200,
        sortable: true,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
        sortable: true,
        editable: false,
    },
    {
        field: 'role_id',
        headerName: 'Role',
        flex: 1,
        minWidth: 200,
        sortable: true,
        editable: false,
    },
    {
        field: 'created_at',
        headerName: 'Created at',
        flex: 1,
        minWidth: 200,
        sortable: true,
        editable: false,
        valueGetter: (data) => {
            return data.row.created_at;
        }
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 200,
        sortable: true,
        editable: false,
        renderCell: (data) => {

            return (
                <Stack spacing={1} direction="row">
                    <UpdateUser formData={{ id: data.row.id, name: data.row.name, email: data.row.email }} />
                    <DeleteUser formData={{ id: data.row.id }} />
                </Stack>
            )

        }
    }
]

export function UsersTable() {

    // Contexts
    const { refreshTable, refresh } = useRefreshTable();
    const { enqueueSnackbar } = useSnackbar();
    // Local states
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {

        let is_mounted = true;
        if (!is_mounted) return '';

        const token = localStorage.getItem('authtoken');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        axios.get("http://localhost:8000/api/v1/user", {
            headers: headers
        })
            .then((response) => {
                setData(response.data.users);
            })
            .catch((error) => {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            is_mounted = false;
        }

    }, [refresh]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                loading={loading}
            />
        </div>
    );
}
