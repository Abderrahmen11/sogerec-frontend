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
const Contact = lazy(() => import('../pages/Contact'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetails = lazy(() => import('../pages/ServiceDetails'));
const GetStarted = lazy(() => import('../pages/GetStarted'));

// Private pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Tickets = lazy(() => import('../pages/Tickets'));
const TicketDetails = lazy(() => import('../pages/TicketDetails'));
const CreateTicket = lazy(() => import('../pages/CreateTicket'));
const Interventions = lazy(() => import('../pages/Interventions'));
const InterventionDetails = lazy(() => import('../pages/InterventionDetails'));
const Planning = lazy(() => import('../pages/Planning'));
const Reports = lazy(() => import('../pages/Reports'));
const Users = lazy(() => import('../pages/Users'));
const UserForm = lazy(() => import('../pages/UserForm'));
const Notifications = lazy(() => import('../pages/Notifications'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRouter = () => (
    <>
        <Navbar />
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<GetStarted />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetails />} />
                <Route path="/get-started" element={<GetStarted />} />

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
                    path="/tickets/:id"
                    element={
                        <PrivateRoute>
                            <TicketDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-ticket"
                    element={
                        <PrivateRoute roles={['client', 'user', 'admin']}>
                            <CreateTicket />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/interventions"
                    element={
                        <PrivateRoute roles={['technician', 'admin', 'client', 'user']}>
                            <Interventions />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/interventions/:id"
                    element={
                        <PrivateRoute roles={['technician', 'admin', 'client', 'user']}>
                            <InterventionDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/planning"
                    element={
                        <PrivateRoute roles={['technician', 'admin']}>
                            <Planning />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/reports"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <Reports />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <Users />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users/create"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <UserForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users/edit/:id"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <UserForm />
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

