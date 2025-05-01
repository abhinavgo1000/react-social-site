import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ColorModeButton } from './components/ui/color-mode';
import LoadingIndicator from './components/common/LoadingIndicator';
import PageFooter from './components/shell/PageFooter/PageFooter';
import './App.css';

const queryClient = new QueryClient();

const HomePage = React.lazy(() => import('./components/pages/HomePage'));
const ForYouPage = React.lazy(() => import('./components/pages/ForYouPage'));
const ProfilePage = React.lazy(() => import('./components/pages/ProfilePage'));
const NotFoundPage = React.lazy(() => import('./components/pages/NotFoundPage'));
// const SettingsPage = React.lazy(() => import('./components/pages/SettingsPage'));
// const LoginPage = React.lazy(() => import('./components/pages/LoginPage'));
// const RegisterPage = React.lazy(() => import('./components/pages/RegisterPage'));
// const ResetPasswordPage = React.lazy(() => import('./components/pages/ResetPasswordPage'));
// const VerifyEmailPage = React.lazy(() => import('./components/pages/VerifyEmailPage'));
// const TermsOfServicePage = React.lazy(() => import('./components/pages/TermsOfServicePage'));
// const PrivacyPolicyPage = React.lazy(() => import('./components/pages/PrivacyPolicyPage'));
// const ContactUsPage = React.lazy(() => import('./components/pages/ContactUsPage'));
// const AboutUsPage = React.lazy(() => import('./components/pages/AboutUsPage'));
// const HelpPage = React.lazy(() => import('./components/pages/HelpPage'));
// const FaqPage = React.lazy(() => import('./components/pages/FaqPage'));
// const FeedbackPage = React.lazy(() => import('./components/pages/FeedbackPage'));
// const BlogPage = React.lazy(() => import('./components/pages/BlogPage'));
// const CommunityPage = React.lazy(() => import('./components/pages/CommunityPage'));
// const EventsPage = React.lazy(() => import('./components/pages/EventsPage'));
// const MarketplacePage = React.lazy(() => import('./components/pages/MarketplacePage'));
// const NewsPage = React.lazy(() => import('./components/pages/NewsPage'));
// const ResourcesPage = React.lazy(() => import('./components/pages/ResourcesPage'));

function App() {

    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <ColorModeButton />
                <Router>
                    <Box maxWidth='100%' minHeight='100vh' margin='40px'>
                        <React.Suspense fallback={<LoadingIndicator />}>
                            <Routes>
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/" element={<Navigate to="/" />} />
                                <Route path="/profile/:id" element={<ProfilePage />} />
                                <Route path="/for-you" element={<ForYouPage />} />
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
