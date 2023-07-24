import React, { useRef, useState } from "react"
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { getLoginToken } from "../../../../lib/users"
import { TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AuthStackNavigationProp } from "../../../../types/types"

function Login(): JSX.Element {
	const passwordRef = useRef<TextInput>(null)
    const navigation = useNavigation<AuthStackNavigationProp>()
    const [userID, setUserID] = useState<string>('')
    const [userPW, setUserPW] = useState<string>('')
    const [loading, setLoading] = useState(false)

	const onPressLogin = (): void => {
        Keyboard.dismiss()

		setLoading(true)

        getLoginToken(userID, userPW)

		setLoading(false)
	}

    const onPress = (): void => {
        navigation.push('Register')
    }


    return (
        <KeyboardAvoidingView style={ styles.container }>
			<SafeAreaView style={ styles.wrapper }>
				<Text style={ styles.text }>The Swing Golf</Text>
				<View style={ styles.form }>
                    <TextInput style={[ styles.input, { marginBottom: 10 }]} placeholder="아이디를 입력하세요." returnKeyType="next" autoCapitalize='none'
                        onChangeText={(userID): void => setUserID(userID)} onSubmitEditing={() =>
                            passwordRef.current && passwordRef.current.focus()
                        }/>
                    <TextInput style={ styles.input } placeholder="비밀번호를 입력하세요." ref={ passwordRef } returnKeyType="done" secureTextEntry
                        onChangeText={(userPW): void => setUserPW(userPW)} onSubmitEditing={ (): void => { onPressLogin } } />
				</View>
                { loading ? (
                    <View style={ styles.spinnerWrapper }>
                        <ActivityIndicator size={ 32 } color='#6200ee' />
                    </View>
                ) : (
                    <View style={ styles.closeContainer }>
                        <Pressable onPress={ onPressLogin }>
                            <Text style={[ styles.button, { marginRight: 50 } ]}> 로그인 </Text>
                        </Pressable>
                        <Pressable onPress={ onPress }>
                            <Text style={ styles.button }> 회원가입 </Text>
                        </Pressable>
                    </View>
                )}
			</SafeAreaView>
		</KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text :{
        fontSize: 32,
        fontWeight: 'bold'
    },
    form: {
        width: '100%',

		marginTop: 64,
        marginBottom: 30,
		paddingHorizontal: 16
    },
    input: {
		height: 48,

		paddingHorizontal: 16,

		borderWidth: 1,
		borderRadius: 4,
		borderColor: '#bdbdbd',

		backgroundColor: 'white'
	},
    closeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
        
		marginTop: 20,
		marginHorizontal: 40
	},
    button: {
		width: 100,
		height: 50,
        
        textAlign: 'center',
		textAlignVertical: 'center',

		fontSize: 16,

		backgroundColor: 'black',
		color: 'white'
    },
    spinnerWrapper: {
		height: 104,

		alignItems: 'center',
		justifyContent: 'center',

		marginTop: 64
	}
})
export default Login