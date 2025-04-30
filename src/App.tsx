import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ColorModeButton } from './components/ui/color-mode';
import LoadingIndicator from './components/common/LoadingIndicator';
import PageFooter from './components/shell/PageFooter/PageFooter';
import './App.css';

const queryClient = new QueryClient();

const HomePage = React.lazy(() => import('./components/pages/HomePage'));

function App() {

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <ColorModeButton />
                <Router>
                    <React.Suspense fallback={<LoadingIndicator />}>
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/" element={<Navigate to="/" />} />
                            <Route path="/profile/:id" element={<div>Profile</div>} />
                            <Route path="/for-you" element={<div>For You</div>} />
                            <Route path='*' element={<div>404 Not Found</div>} />
                        </Routes>
                    </React.Suspense>
                    <PageFooter />
                </Router>
            </QueryClientProvider>
        </React.Fragment>
    );
}

export default App
