import * as React from 'react';
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ResetPasswordForm from '../common/ResetPasswordForm';

function ResetPasswordPage() {

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
                    <Heading>{t('pages.resetPassword.title')}</Heading>
                    <Text>{t('pages.resetPassword.description')}</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4}>
                    <ResetPasswordForm />
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}

export default ResetPasswordPage;
