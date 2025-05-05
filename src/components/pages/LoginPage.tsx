import * as React from 'react';
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../common/LoginForm';

function LoginPage() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={1} colSpan={4}>
                    <Heading>{t('pages.login.title')}</Heading>
                    <Text>{t('pages.login.description')}</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4}>
                    <LoginForm />
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}

export default LoginPage;
