import { Alert } from "react-native"
import axios from 'axios'
import useAuthActions from "../hooks/useAuthActions"

export interface User {
    userID: string,
    userPW: string,
    name: string,
    nickname: string,
    gender?: string,
    email?: string
}

export const getLoginToken = async (userID: string, userPW: string): Promise<void> => {
    if (userID == "" || userPW == "") {
        return Alert.alert("아이디, 비밀번호를 입력해주세요.")
    }

    await axios.post(process.env.SERVER_ADDR + "/login", {
        id: userID,
        pw: userPW
    }).then(loginHandler).catch(errorHandler)

}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error.response.data)
}

const loginHandler = (res: { data: { token: string }}): void => {
    const { authorize } = useAuthActions()
    console.log(res.data.token)
    if (res === null) return

    const token: string = res.data.token

    authorize(token)
}

export const register = (user: User): void => {
    if (user.userID == "" || user.userPW == "" || user.name == "" || user.nickname == "") {
        return Alert.alert("필수 항목을 입력해주세요.")
    }

    if (user.userID.length < 4) {
        return Alert.alert("아이디는 4글자 이상이어야합니다.")
    }

    Alert.alert(
        '알림?',
        '가입하시겠습니까?',
        [
            {
                text: '취소',
                onPress: () => { return },
                style: 'cancel',
            },{
                text: 'OK', 
                onPress: async (): Promise<void> => {
                    const GENDER_NONE: number = 0
                    const GENDER_FEMALE: number = 1
                    const GENDER_MALE: number = 2
                
                    let gender: number = GENDER_NONE
                    let userEmail: string | undefined | null = user.email == null ? '' : user.email
                    
                    switch (user.gender) {
                        case "남자": 
                            gender = GENDER_MALE
                            break
                        case "여자":
                            gender = GENDER_FEMALE
                            break
                        case "기타":
                            gender = GENDER_NONE
                            break
                    }
                
                    await axios.post(process.env.SERVER_ADDR + '/register', {
                        id: user.userID,
                        pw: user.userPW,
                        name: user.name,
                        nickname: user.nickname,
                        gender: gender,
                        email: userEmail
                    }).then(registerHandler).catch(errorHandler)
                },
            }
        ],
    )
}

const registerHandler = (res: { data: { success: boolean } }): void => {
    if (res === null) return

    Alert.alert('알림', '가입되었습니다.')
}