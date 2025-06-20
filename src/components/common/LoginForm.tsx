import * as React from 'react';
import { 
    Box, Button, Checkbox, Field, Fieldset, Input, Stack, Text
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { login } from '../../store/reducer/authSlice';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function LoginForm() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [rememberMe, setRememberMe] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { mutate: loginUser } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Login successful:', data);
            // Handle successful login here
            dispatch(login(data));
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle login error here
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        if (isSubmitting) return; // Prevent multiple submissions

        if (email === '' || password === '') {
            if (email === '') {
                setEmailError(t('errors.validation.required', { field: t('forms.login.email') }));
            }
            if (password === '') {
                setPasswordError(t('errors.validation.required', { field: t('forms.login.password') }));
            }
            return;
        }
        setIsSubmitting(true);
        setEmailError(null); // Reset error state
        setPasswordError(null); // Reset error state
        event.preventDefault();
        loginUser(); // Call the login mutation
        navigate('/home'); // Redirect to home page after login
    };

    return (
        <React.Fragment>
            <Box width='100%' alignItems='start' maxWidth='400px' mt='40px'>
                <Fieldset.Root size='lg' maxW='md'>
                    <Stack>
                        <Fieldset.Legend>{t('forms.login.loginTitle')}</Fieldset.Legend>
                        <Fieldset.HelperText>
                            {t('forms.login.loginDescription')}
                        </Fieldset.HelperText>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root required invalid={!!emailError}>
                            <Field.Label>{t('forms.login.email')}</Field.Label>
                            <Input 
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('forms.login.emailPlaceholder')} />
                            {emailError && (<Field.ErrorText>{emailError}</Field.ErrorText>)}
                        </Field.Root>
                        <Field.Root required invalid={!!passwordError}>
                            <Field.Label>{t('forms.login.password')}</Field.Label>
                            <Input 
                                type='password'
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('forms.login.passwordPlaceholder')} />
                            {passwordError && (<Field.ErrorText>{passwordError}</Field.ErrorText>)}
                        </Field.Root>
                    </Fieldset.Content>
                    <Checkbox.Root 
                        variant='subtle'
                        checked={rememberMe} 
                        onCheckedChange={(e) => setRememberMe(!!e.checked)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{t('forms.login.rememberMe')}</Checkbox.Label>
                    </Checkbox.Root>
                    <Button type='submit' onClick={handleSubmit}>{t('forms.login.submit')}</Button>
                    <Link to='/reset-password'>{t('forms.login.forgotPassword')}</Link>
                    <Text>
                        {t('forms.login.createAccount')} <Link to='/register'>{t('forms.login.register')}</Link>
                    </Text>
                </Fieldset.Root>
            </Box>
        </React.Fragment>
    );
}

export default LoginForm;
