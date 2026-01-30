import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/bootstrap-overrides.css';
import './styles/MobileTables.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
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

