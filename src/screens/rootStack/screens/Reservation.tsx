import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


function ReservationScreen(): JSX.Element {
    return (
        <View style={ styles.container }>
            <Text>스크린 예약 페이지</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 24
    }
})

export default ReservationScreen
