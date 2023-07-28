import React from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import useAuthActions from '../../../../hooks/useAuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserInfo from '../../../../hooks/useUserInfo';

function Menu(): JSX.Element {
    const { logout } = useAuthActions()
    const profile = useUserInfo()

    const onPressLogout = (): void => {
        Alert.alert(
            '알림',
            '로그아웃 하시겠습니까?',
            [
                {
                    text: '취소',
                    onPress: () => { return },
                    style: 'cancel',
                },{
                    text: 'OK', 
                    onPress: async (): Promise<void> => {
                        try {
                            await AsyncStorage.clear()
                            logout()
                        } catch (error: any) {
                            console.log(error)
                        }
                    },
                }
            ],
        )
    }

    return (
        <View style={ styles.container }>
            <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                android_ripple={{ color: '#ededed' }} onPress={ onPressLogout }>
                <Text>로그아웃</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: 300,

        alignItems: 'center',
        
        marginTop: 30,
        padding: 10,

        borderWidth: 0.3
    }
})

export default Menu
