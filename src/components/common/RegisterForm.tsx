import * as React from 'react';
import { 
    Box, Button, Checkbox, Field, Fieldset, Input, Link, Stack, Text
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { register } from '../../store/reducer/authSlice';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function RegisterForm() {

    const [userName, setUserName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [tAndC, setTAndC] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [userNameError, setUserNameError] = React.useState<string | null>(null);
    const [firstNameError, setFirstNameError] = React.useState<string | null>(null);
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { mutate: registerUser } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {
                userName,
                firstName,
                email,
                password,
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            // Handle successful registration here
            dispatch(register(data));
            navigate('/home'); // Redirect to home page after registration
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            // Handle registration error here
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        if (isSubmitting) return; // Prevent multiple submissions

        if (userName === '' || firstName === '' || email === '' || password === '' || confirmPassword === '') {
            if (userName === '') {
                setUserNameError(t('errors.validation.required', { field: t('forms.register.username') }));
            }
            if (firstName === '') {
                setFirstNameError(t('errors.validation.required', { field: t('forms.register.firstName') }));
            }
            if (email === '') {
                setEmailError(t('errors.validation.required', { field: t('forms.register.email') }));
            }
            if (password === '') {
                setPasswordError(t('errors.validation.required', { field: t('forms.register.password') }));
            }
            if (confirmPassword === '') {
                setConfirmPasswordError(t('errors.validation.required', { field: t('forms.register.confirmPassword') }));
            }
            return;
        }
        setIsSubmitting(true);
        setEmailError(null); // Reset error state
        setPasswordError(null); // Reset error state
        setConfirmPasswordError(null); // Reset error state
        event.preventDefault();
        registerUser(); // Call the register mutation
        navigate('/home'); // Redirect to home page after registration
    };

    React.useEffect(() => {
        if (password !== confirmPassword) {
            setConfirmPasswordError(t('errors.validation.password.match'));
        } else {
            setConfirmPasswordError(null);
        }
    }, [password, confirmPassword, t]);

    return (
        <React.Fragment>
            <Box width='100%' alignItems='start' maxWidth='400px' mt='40px' minHeight='100vh'>
                <Fieldset.Root size='lg' maxW='md'>
                    <Stack>
                        <Fieldset.Legend>{t('forms.register.registerTitle')}</Fieldset.Legend>
                        <Fieldset.HelperText>
                            {t('forms.register.registerDescription')}
                        </Fieldset.HelperText>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root required invalid={!!userNameError}>
                            <Field.Label>{t('forms.register.username')}</Field.Label>
                            <Input
                                type='text'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder={t('forms.register.usernamePlaceholder')}
                            />
                            {userNameError && <Field.ErrorText>{userNameError}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root required invalid={!!firstNameError}>
                            <Field.Label>{t('forms.register.firstName')}</Field.Label>
                            <Input
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={t('forms.register.firstNamePlaceholder')}
                            />
                            {firstNameError && <Field.ErrorText>{firstNameError}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root required invalid={!!emailError}>
                            <Field.Label>{t('forms.register.email')}</Field.Label>
                            <Input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('forms.register.emailPlaceholder')}
                            />
                            {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root required invalid={!!passwordError}>
                            <Field.Label>{t('forms.register.password')}</Field.Label>
                            <Input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('forms.register.passwordPlaceholder')}
                            />
                            {passwordError && <Field.ErrorText>{passwordError}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root required invalid={!!confirmPasswordError}>
                            <Field.Label>{t('forms.register.confirmPassword')}</Field.Label>
                            <Input
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={t('forms.register.confirmPasswordPlaceholder')}
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
                        <Checkbox.Label>{t('forms.register.terms')}</Checkbox.Label>
                    </Checkbox.Root>
                    <Button type='submit' onClick={handleSubmit}>
                        {t('forms.register.submit')}
                    </Button>
                    <Text>
                        {t('forms.register.login')} <Link href='/login'>{t('forms.register.loginLink')}</Link>
                    </Text>
                </Fieldset.Root>
            </Box>
        </React.Fragment>
    );
}

export default RegisterForm;
