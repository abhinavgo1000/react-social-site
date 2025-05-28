import * as React from 'react';
import { Box, Field, Input, Popover, Portal } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatepicker({ dateLabel, datePlaceholder }: { dateLabel?: string; datePlaceholder?: string; }) {

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const [selectedDateError, setSelectedDateError] = React.useState<string | null>(null);

    const datePickerRef = React.useRef<HTMLElement | null>(null);

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
                    <Field.Label>{dateLabel}</Field.Label>
                    <Input
                        type="text"
                        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                        readOnly
                        placeholder={datePlaceholder || t('forms.datepicker.placeholder')}
                    />
                    {selectedDateError && <Field.ErrorText>{selectedDateError}</Field.ErrorText>}
                </Field.Root>
            </Popover.Trigger>
            <Portal container={datePickerRef}>
                <Popover.Content>
                    <Popover.Body>
                        <DatePicker
                            showIcon={true}
                            dateFormat="dd/MM/yyyy"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline
                        />
                    </Popover.Body>
                </Popover.Content>
            </Portal>
            <Box ref={datePickerRef}></Box>
        </Popover.Root>
    );
}

export default CustomDatepicker;