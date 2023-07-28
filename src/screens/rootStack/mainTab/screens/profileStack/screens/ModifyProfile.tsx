import React, { useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAccessToken } from '../../../../../../hooks/useToken';
import useUserInfo from '../../../../../../hooks/useUserInfo';
import { UserInfo } from '../../../../../../lib/types';
import { useUsers } from '../../../../../../hooks/useUsers';

interface ChangeTextHandler {
	(value: string): void
}

function ModifyProfile(): JSX.Element {
    const userInfo = useUserInfo()
    const accessToken = useAccessToken()
    const { isLoading, modify } = useUsers()
    const [user, setUser] = useState<UserInfo>({
        ...userInfo,
        nick: ''
    })
    
    const createChangeTextHadler = (text: string): ChangeTextHandler => (value: string): void => {
        setUser({ ...user, [text]: value})
    }

    const onPressModify = async (): Promise<void> => {
        Keyboard.dismiss()

        if (user.nick == "") {
            Alert.alert('알림', '닉네임을 입력해주세요.')
            return
        }

        if (accessToken) {
            await modify(accessToken, user)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.profile }>
                <Text style={ styles.text }>닉네임 변경</Text>
                <TextInput style={ styles.input } placeholder="변경할 닉네임을 입력하세요." returnKeyType="done" autoCapitalize='none'
                        onChangeText={ createChangeTextHadler('nick') }  />
            </View>

            { isLoading ? (
                <View style={ styles.spinnerWrapper }>
                    <ActivityIndicator size={ 32 } color='#6200ee' />
                </View>
                ) : (
                <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                    android_ripple={{ color: '#ededed' }} onPress={ onPressModify }>
                    <Text>수정하기</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    profile: {
        width: 300,

        marginTop: 30
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',

        marginBottom: 5,

        color: 'black'
    },
    button: {
        width: 200,

        alignItems: 'center',
        
        marginTop: 30,
        padding: 10,

        borderWidth: 0.3
    },
    input: {
		height: 48,

		paddingHorizontal: 16,
        marginVertical: 10,

		borderWidth: 1,
		borderRadius: 4,
		borderColor: '#bdbdbd',

		backgroundColor: 'white'
	},
    spinnerWrapper: {
		height: 104,

		alignItems: 'center',
		justifyContent: 'center',

		marginTop: 64
	}
})

export default ModifyProfile
