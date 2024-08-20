import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useNetInfo, NetInfoState } from '@react-native-community/netinfo';
import AppText from './AppText';
import Constants from 'expo-constants';
import colors from '../config/colors';


interface OfflineNotificationProps {}

function OfflineNotification(props: OfflineNotificationProps) {
    const netInfo: NetInfoState = useNetInfo();

    if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
        return (
            <View style={styles.container}>
                <AppText style={styles.text}>Offline</AppText>
            </View>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.danger,
        height: 50,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        top: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    text: {
        color: colors.white,
    } as TextStyle,
});

export default OfflineNotification;
