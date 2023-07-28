import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import useUserInfo from '../../../../../../hooks/useUserInfo';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackNavigationProp } from '../../../../../../types/types';

function MyProfile(): JSX.Element {
    const navigation = useNavigation<ProfileStackNavigationProp>()
    const myProfile = useUserInfo()

    const onPress = (): void => {
        navigation.push('ModifyProfile')
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.profile }>
                <Text style={ styles.text }>아이디 : { myProfile.id }</Text>
                <Text style={ styles.text }>닉네임 : { myProfile.nick }</Text>
            </View>

            <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                android_ripple={{ color: '#ededed' }} onPress={ onPress }>
                <Text>내 정보 수정</Text>
            </Pressable>
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

        marginBottom: 20,

        color: 'black'
    },
    button: {
        width: 300,

        alignItems: 'center',
        
        marginTop: 30,
        padding: 10,

        borderWidth: 0.3
    }
})

export default MyProfile
