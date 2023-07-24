import React, { useRef, useState } from "react"
import { ActivityIndicator, Keyboard, Pressable, TextInput } from "react-native"
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { User, register } from "../../../../lib/users"
import { RadioButton } from 'react-native-paper'

interface ChangeTextHandler {
	(value: string): void
}

function Register(): JSX.Element {
	const passwordRef = useRef<TextInput>(null)
	const nameRef = useRef<TextInput>(null)
	const nicknameRef = useRef<TextInput>(null)
	const emailRef = useRef<TextInput>(null)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User>({
        userID: '',
        userPW: '',
        name: '',
        nickname: ''
    })

    const onPressRegister = (): void => {
        Keyboard.dismiss()

        setLoading(true)
        register(user)
        setLoading(false)
	}

    const createChangeTextHadler = (text: string): ChangeTextHandler => (value: string): void => {
        setUser({ ...user, [text]: value})
    }

    
    return (
        <KeyboardAvoidingView style={ styles.container }>
			<SafeAreaView style={ styles.wrapper }>
				<Text style={ styles.text }>회원가입</Text>
				<Pressable style={ styles.form } onPress={(): void => Keyboard.dismiss() } > 
                    <Text style={ styles.inputTitle }>아이디</Text>
                    <TextInput style={ styles.input } placeholder="아이디를 입력하세요." returnKeyType="next" autoCapitalize='none'
                        onChangeText={ createChangeTextHadler('userID') } onSubmitEditing={(): void | null =>
                            passwordRef.current && passwordRef.current.focus()
                        }/>
                    <Text style={ styles.inputTitle }>비밀번호</Text>
                    <TextInput style={ styles.input } placeholder="비밀번호를 입력하세요." ref={ passwordRef } returnKeyType="done" secureTextEntry
                        onChangeText={ createChangeTextHadler('userPW') } onSubmitEditing={(): void | null =>
                            nameRef.current && nameRef.current.focus()
                        }/>
                    <Text style={ styles.inputTitle }>이름</Text>
                    <TextInput style={ styles.input } placeholder="이름을 입력하세요." ref={ nameRef } returnKeyType="done" 
                        onChangeText={ createChangeTextHadler('name') } onSubmitEditing={(): void | null =>
                            nicknameRef.current && nicknameRef.current.focus()
                        }/>
                    <Text style={ styles.inputTitle }>닉네임</Text>
                    <TextInput style={ styles.input } placeholder="닉네임을 입력하세요." ref={ nicknameRef } returnKeyType="done" 
                        onChangeText={ createChangeTextHadler('nickname') } onSubmitEditing={(): void | null =>
                            emailRef.current && emailRef.current.focus()
                        }/>
                    <Text style={ styles.inputTitle }>이메일</Text>
                    <TextInput style={ styles.input } placeholder="이메일을 입력하세요. (선택)" ref={ emailRef } returnKeyType="done" 
                        onChangeText={ createChangeTextHadler('email') } 
                        />

                    <Text style={ styles.inputTitle }>성별</Text>
                    <RadioButton.Group onValueChange={newValue => setUser({ ...user, gender: newValue})} value={ user.gender ?? '' } >
                        <View style={ styles.radioContainer }>
                            <View style={ styles.radioButton }>
                                <Text>기타</Text>
                                <RadioButton value="기타" />
                            </View>
                            <View style={ styles.radioButton }>
                                <Text>남자</Text>
                                <RadioButton value="남자" />
                            </View>
                            <View style={ styles.radioButton }>
                                <Text>여자</Text>
                                <RadioButton value="여자" />
                            </View>
                        </View>
                    </RadioButton.Group>
				</Pressable>
                { loading ? (
                    <View style={ styles.spinnerWrapper }>
                        <ActivityIndicator size={ 32 } color='#6200ee' />
                    </View>
                ) : (
                    <View style={ styles.closeContainer }>
                        <Pressable onPress={ onPressRegister }>
                            <Text style={[ styles.button, { marginRight: 50 } ]}> 회원가입 </Text>
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

		marginTop: 34,
		paddingHorizontal: 16
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
    gender: {
        flexDirection: 'row',
		alignItems: 'center'
    },
    inputTitle: {
        fontSize: 14,
        fontWeight: 'bold',

        color: 'black'
    },
    radioContainer: {
		flexDirection: 'row',
    },
    radioButton: {
		flexDirection: 'row',

		alignItems: 'center',
    },
    closeContainer: {
        width: '100%',
        textAlign: 'center',
		alignItems: 'center',
        
		marginTop: 20,
		marginHorizontal: 40
	},
    button: {
        width: 300,
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

export default Register