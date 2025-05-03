import * as React from 'react';
import { Box } from '@chakra-ui/react'
import { ColorModeButton } from '../../ui/color-mode';
import Logo from './Logo';

function PageHeader() {
    return (
        <React.Fragment>
            <Box
                p='4'
                borderWidth='1px'
                borderColor='border.200'
                color='text.primary'
                bg='background.paper'
            >
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Box fontSize='2xl' fontWeight='bold'><Logo /></Box>
                    <ColorModeButton />
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default PageHeader;
