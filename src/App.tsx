import * as React from 'react';
import { 
    Navigate, RouterProvider, createBrowserRouter 
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import LoadingIndicator from './components/common/LoadingIndicator';
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage />,
            },
            {
                path: 'verify-email/:token',
                element: <VerifyEmailPage />,
            },
            {
                path: 'home',
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'profile/:id',
                element: (
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'for-you',
                element: (
                    <PrivateRoute>
                        <ForYouPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'settings',
                element: (
                    <PrivateRoute>
                        <SettingsPage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/',
                element: (
                    <PrivateRoute>
                        <Navigate to='/home' />
                    </PrivateRoute>
                ),
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

function App() {

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <React.Suspense fallback={<LoadingIndicator />}>
                    <RouterProvider router={router} />
                </React.Suspense>
            </QueryClientProvider>
        </React.Fragment>
    );
}

export default App
