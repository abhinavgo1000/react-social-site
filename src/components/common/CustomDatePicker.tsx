import * as React from 'react';
import { Box, Field, Input, Popover } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatepicker() {

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const [selectedDateError, setSelectedDateError] = React.useState<string | null>(null);

    const { t } = useTranslation();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            setSelectedDateError(null); // Reset error state
        } else {
            setSelectedDateError(t('errors.validation.required', { field: t('forms.datepicker.date') }));
        }
    };

    return (
        <Popover.Root>
            <Popover.Trigger>
                <Field.Root>
                    <Field.Label>{t('forms.datepicker.date')}</Field.Label>
                    <Input
                        type="text"
                        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                        readOnly
                        placeholder={t('forms.datepicker.datePlaceholder')}
                    />
                    {selectedDateError && <Field.ErrorText>{selectedDateError}</Field.ErrorText>}
                </Field.Root>
            </Popover.Trigger>
            <Popover.Content>
                <Popover.Body>
                    <Box>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline
                        />
                    </Box>
                </Popover.Body>
            </Popover.Content>
        </Popover.Root>
    );
}

export default CustomDatepicker;