import * as React from 'react';
import { 
    Box, Button, Checkbox, Field, Fieldset, Input, Stack, Text
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetPassword } from '../../store/reducer/authSlice';

function ResetPasswordForm() {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [tAndC, setTAndC] = React.useState(false);

    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = (event: React.FormEvent) => {
        if (isSubmitting) return; // Prevent multiple submissions

        if (email === '' || password === '' || confirmPassword === '') {
            if (email === '') {
                setEmailError(t('errors.validation.required', { field: t('forms.resetPassword.email') }));
            }
            if (password === '') {
                setPasswordError(t('errors.validation.required', { field: t('forms.resetPassword.password') }));
            }
            if (confirmPassword === '') {
                setConfirmPasswordError(t('errors.validation.required', { field: t('forms.resetPassword.confirmPassword') }));
            }
            return;
        }
        setIsSubmitting(true);
        setEmailError(null); // Reset error state
        setPasswordError(null); // Reset error state
        setConfirmPasswordError(null); // Reset error state
        // Simulate form submission
        event.preventDefault();
        // Handle form submission logic here
        dispatch(resetPassword({ email, password }));
        navigate('/home'); // Redirect to home page after reset password
    };

    return (
        <React.Fragment>
            <Box width='100%' alignItems='start' maxWidth='400px' mt='40px'>
                <Fieldset.Root size='lg' maxW='md'>
                    <Stack>
                        <Fieldset.Legend>{t('forms.resetPassword.resetPasswordTitle')}</Fieldset.Legend>
                        <Fieldset.HelperText>
                            {t('forms.resetPassword.resetPasswordDescription')}
                        </Fieldset.HelperText>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>{t('forms.resetPassword.email')}</Field.Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('forms.resetPassword.emailPlaceholder')}
                            />
                            {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>{t('forms.resetPassword.password')}</Field.Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('forms.resetPassword.passwordPlaceholder')}
                            />
                            {passwordError && <Field.ErrorText>{passwordError}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>{t('forms.resetPassword.confirmPassword')}</Field.Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={t('forms.resetPassword.confirmPasswordPlaceholder')}
                            />
                            {confirmPasswordError && <Field.ErrorText>{confirmPasswordError}</Field.ErrorText>}
                        </Field.Root>
                    </Fieldset.Content>
                    <Checkbox.Root 
                        variant='subtle'
                        checked={tAndC} 
                        onCheckedChange={(e) => setTAndC(!!e.checked)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{t('forms.resetPassword.terms')}</Checkbox.Label>
                    </Checkbox.Root>
                    <Button colorScheme='blue' onClick={handleSubmit}>
                        {t('forms.resetPassword.submit')}
                    </Button>
                    <Text>
                        {t('forms.resetPassword.backToLogin')} <Link to='/login'>{t('forms.resetPassword.backToLoginLink')}</Link>
                    </Text>
                </Fieldset.Root>
            </Box>
        </React.Fragment>
    );
}

export default ResetPasswordForm;
