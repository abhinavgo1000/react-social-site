import * as React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

function LoginPage() {
    return (
        <React.Fragment>
            <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={1} colSpan={4}>
                    <h1>Login Page</h1>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4}>
                    <p>Welcome to the login page!</p>
                </GridItem>
            </Grid>
        </React.Fragment>
    );
}

export default LoginPage;
