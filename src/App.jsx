import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/bootstrap-overrides.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import theme from './styles/theme';

import { AuthProvider } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';
import { InterventionProvider } from './context/InterventionContext';
import { NotificationProvider } from './context/NotificationContext';
import { UIProvider } from './context/UIContext';
import AppRouter from './router/AppRouter';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <TicketProvider>
                    <InterventionProvider>
                        <NotificationProvider>
                            <UIProvider>
                                <AppRouter />
                            </UIProvider>
                        </NotificationProvider>
                    </InterventionProvider>
                </TicketProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

