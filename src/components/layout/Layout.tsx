import * as React from 'react';
import { Box } from '@chakra-ui/react';
import PageHeader from '../shell/PageHeader/PageHeader';
import PageFooter from '../shell/PageFooter/PageFooter';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <React.Fragment>
            <PageHeader />
            <Box maxWidth='100%' minHeight='110vh' margin='40px'>
                <Outlet />
            </Box>
            <PageFooter />
        </React.Fragment>
    );
}

export default Layout;
