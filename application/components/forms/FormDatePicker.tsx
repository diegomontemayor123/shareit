import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';

const FormDatePicker: React.FC<any> = ({ name, placeholder }) => {
    const { errors, setFieldValue, touched } = useFormikContext<Record<string, string[]>>();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const { user } = useAuth()

    const handleDateSelect = (date: string) => {

        const dateWithUser = {
            date,
            userId: user._id
        }

        setSelectedDate(date);
        setFieldValue(name, dateWithUser)
    };

    return (
        <View>
            <Calendar
                onDayPress={(day: any) => handleDateSelect(day.dateString)}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: colors.primary, selectedTextColor: 'white' },
                    [placeholder]: { selected: true, selectedColor: colors.primary, selectedTextColor: 'white' }
                }} />
            <ErrorMessage error={errors[name] as string} visible={Boolean(touched[name])} />
        </View>)
};

export default FormDatePicker;
