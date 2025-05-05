import * as React from 'react';
import { Box, Button, Field, Fieldset, Input, Link, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LoginForm() {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
        navigate('/home'); // Redirect to home page after login
    };

    return (
        <React.Fragment>
            <Box width='100%' maxWidth='400px' mx='auto' mt='50px'>
                <Fieldset.Root size='lg' maxW='md'>
                    <Stack>
                        <Fieldset.Legend>{t('forms.login.loginTitle')}</Fieldset.Legend>
                        <Fieldset.HelperText>
                            {t('forms.login.loginDescription')}
                        </Fieldset.HelperText>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root required>
                            <Field.Label>{t('forms.login.email')}</Field.Label>
                            <Input type='email' placeholder={t('forms.login.emailPlaceholder')} />
                            <Field.ErrorText>{t('errors.validation.required')}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>{t('forms.login.password')}</Field.Label>
                            <Input type='password' placeholder={t('forms.login.passwordPlaceholder')} />
                            <Field.ErrorText>{t('errors.validation.required')}</Field.ErrorText>
                        </Field.Root>
                    </Fieldset.Content>
                    <Button type='submit' onClick={handleSubmit}>{t('forms.login.submit')}</Button>
                        <Link href='/reset-password'>{t('forms.login.forgotPassword')}</Link>
                        <Text>
                            {t('forms.login.createAccount')} <Link href='/register'>{t('forms.login.register')}</Link>
                        </Text>
                </Fieldset.Root>
            </Box>
        </React.Fragment>
    );
}

export default LoginForm;
