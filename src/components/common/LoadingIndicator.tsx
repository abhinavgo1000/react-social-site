import * as React from "react";
import { Spinner } from "@chakra-ui/react";

function LoadingIndicator() {
    return (
        <React.Fragment>
            <Spinner size='xl' />
        </React.Fragment>
    );
}

export default LoadingIndicator;
