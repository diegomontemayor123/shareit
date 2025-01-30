import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';

const FormDatePicker: React.FC<any> = ({ name, placeholder }) => {
    const { errors, setFieldValue, touched } = useFormikContext<any>();
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [newPlaceholder, setNewPlaceholder] = useState<string[]>(placeholder || []);
    const { user } = useAuth()
    const bookingDates = newPlaceholder ? newPlaceholder.map((booking: any) => booking.date) : []

    const handleDateSelect = (date: string) => {
        const updatedSelectedDates = selectedDates.includes(date) ?
            selectedDates.filter(d => d !== date) :
            newPlaceholder.includes(date) ?
                [...selectedDates] : [...selectedDates, date]
        setSelectedDates(updatedSelectedDates);

        const updatedPlaceholder = newPlaceholder.includes(date) ?
            newPlaceholder.filter(d => d !== date) : [...newPlaceholder]
        setNewPlaceholder(updatedPlaceholder)

        const datesWithUser = [
            ...updatedSelectedDates.map(d => ({ date: d, userId: user._id })),
            ...newPlaceholder
        ]
        console.log('includesdate', newPlaceholder.includes(date))
        console.log('selectedDates', selectedDates,)
        console.log('newplaceholder', newPlaceholder,)
        console.log('dateswithuser ', datesWithUser)
        setFieldValue(name, datesWithUser)
    };

    const markedDates = selectedDates.reduce((acc, date) => {
        acc[date] = { selected: true, selectedColor: colors.primary };
        return acc
    }, {} as any);


    const placeholderMarkedDates = bookingDates.reduce((acc: any, date: any) => {
        acc[date] = { selected: true, selectedColor: colors.secondary };
        return acc
    }, {} as any);

    return (
        <View><Calendar
            onDayPress={(day: any) => handleDateSelect(day.dateString)}
            markedDates={{
                ...markedDates, ...placeholderMarkedDates
            }} />
            <ErrorMessage error={errors[name] as string} visible={Boolean(touched[name])} />
        </View>)
};
export default FormDatePicker;
