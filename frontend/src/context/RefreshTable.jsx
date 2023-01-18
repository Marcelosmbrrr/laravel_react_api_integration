import * as React from 'react';
import { api as axios } from '../services/api';

export const RefreshTableContext = React.createContext({});

export function RefreshTableProvider({ children }) {

    const [refresh, setRefresh] = React.useState(null);

    function refreshTable() {
        setRefresh((old) => !old);
    }

    return (
        <RefreshTableContext.Provider value={{ refreshTable, refresh }}>
            {children}
        </RefreshTableContext.Provider>
    )

}

// Hook
export function useRefreshTable() {
    return React.useContext(RefreshTableContext);
}

