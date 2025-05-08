import * as React from 'react';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

interface ReusableDialogProps {
    dialogOpen?: boolean;
    onDialogOpen?: (res: boolean) => void;
    onDialogRes?: (res: boolean) => void;
    dialogTitle?: string;
    dialogAgreeLabel?: string;
    dialogDisagreeLabel?: string;
    children: React.ReactNode;
}

function ReusableDialog(props: ReusableDialogProps) {

    const { 
        dialogOpen, onDialogOpen, onDialogRes, dialogTitle, dialogAgreeLabel, dialogDisagreeLabel, children 
    } = props;

    return (
        <React.Fragment>
            <Dialog.Root open={dialogOpen} onOpenChange={(e) => onDialogOpen && onDialogOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>{dialogTitle}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                {children}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button 
                                        variant='ghost'
                                        colorPalette='red'
                                        onClick={() => {
                                            if (onDialogRes) {
                                                onDialogRes(false);
                                            }
                                        }}
                                    >{
                                        dialogDisagreeLabel}
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button 
                                    variant='ghost'
                                    onClick={() => {
                                        if (onDialogRes) {
                                            onDialogRes(true);
                                        }
                                    }}
                                >
                                    {dialogAgreeLabel}
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </React.Fragment>
    );
}

export default ReusableDialog;
