import * as React from 'react';
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../common/RegisterForm';

function RegisterPage() {

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
                    <Heading>{t('pages.register.title')}</Heading>
                    <Text>{t('pages.register.description')}</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4}>
                    <RegisterForm />
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}

export default RegisterPage;
