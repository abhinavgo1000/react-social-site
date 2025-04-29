import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

function App() {

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/home" element={<div>Home</div>} />
                        <Route path="/" element={<Navigate to="/" />} />
                        <Route path="/profile/:id" element={<div>Profile</div>} />
                        <Route path="/contact" element={<div>Contact</div>} />
                        <Route path='*' element={<div>404 Not Found</div>} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </React.Fragment>
    );
}

export default App
