import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import LoadingIndicator from './components/common/LoadingIndicator';
import PageHeader from './components/shell/PageHeader/PageHeader';
import PageFooter from './components/shell/PageFooter/PageFooter';
import { RootState } from './store/store';
import './App.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const HomePage = React.lazy(() => import('./components/pages/HomePage'));
const ForYouPage = React.lazy(() => import('./components/pages/ForYouPage'));
const ProfilePage = React.lazy(() => import('./components/pages/ProfilePage'));
const NotFoundPage = React.lazy(() => import('./components/pages/NotFoundPage'));
const LoginPage = React.lazy(() => import('./components/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/pages/RegisterPage'));
const ResetPasswordPage = React.lazy(() => import('./components/pages/ResetPasswordPage'));
const VerifyEmailPage = React.lazy(() => import('./components/pages/VerifyEmailPage'));
const SettingsPage = React.lazy(() => import('./components/pages/SettingsPage'));

// PrivateRoute component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

function App() {

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <PageHeader />
                    <Box maxWidth='100%' minHeight='110vh' margin='40px'>
                        <React.Suspense fallback={<LoadingIndicator />}>
                            <Routes>
                                {/* Public Routes */}
                                <Route path='/login' element={<LoginPage />} />
                                <Route path='/register' element={<RegisterPage />} />
                                <Route path='/reset-password' element={<ResetPasswordPage />} />
                                <Route path='/verify-email/:token' element={<VerifyEmailPage />} />

                                {/* Private Routes */}
                                <Route 
                                    path='/home' 
                                    element={
                                        <PrivateRoute>
                                            <HomePage />
                                        </PrivateRoute>
                                    } 
                                />
                                <Route
                                    path='/profile/:id'
                                    element={
                                        <PrivateRoute>
                                            <ProfilePage />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/for-you'
                                    element={
                                        <PrivateRoute>
                                            <ForYouPage />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path='/settings'
                                    element={
                                        <PrivateRoute>
                                            <SettingsPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Default Route */}
                                <Route
                                    path='/'
                                    element={
                                        isAuthenticated ? (
                                            <Navigate to='/home' />
                                        ) : (
                                            <Navigate to='/login' />
                                        )
                                    }
                                />
                                
                                {/* Catch-All Route */}
                                <Route path='*' element={<NotFoundPage />} />
                            </Routes>
                        </React.Suspense>
                    </Box>
                    <PageFooter />
                </Router>
            </QueryClientProvider>
        </React.Fragment>
    );
}

export default App
