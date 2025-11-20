import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Loader from '../components/common/Loader';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Public pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

// Private pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Tickets = lazy(() => import('../pages/Tickets'));
const Interventions = lazy(() => import('../pages/Interventions'));
const Planning = lazy(() => import('../pages/Planning'));
const Reports = lazy(() => import('../pages/Reports'));
const Users = lazy(() => import('../pages/Users'));
const Notifications = lazy(() => import('../pages/Notifications'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRouter = () => (
    <>
        <Navbar />
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/tickets"
                    element={
                        <PrivateRoute>
                            <Tickets />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/interventions"
                    element={
                        <PrivateRoute>
                            <Interventions />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/planning"
                    element={
                        <PrivateRoute>
                            <Planning />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <PrivateRoute>
                            <Reports />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <PrivateRoute>
                            <Notifications />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
        <Footer />
    </>
);

export default AppRouter;

