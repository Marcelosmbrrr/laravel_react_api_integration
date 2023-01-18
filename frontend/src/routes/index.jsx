import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Guest/Login";
import { Dashboard } from '../pages/Internal/Dashboard';
import { NotFound } from '../pages/NotFound';
// Context
import { RefreshTableProvider } from '../context/RefreshTable';

export function AppRoutes() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/internal/dashboard" element={
                <RefreshTableProvider>
                    <Dashboard />
                </RefreshTableProvider>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}