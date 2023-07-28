import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import Config from "react-native-config";
import { LoginData, Token, UserInfo, Response, Body, User } from "../lib/types";
import useAuthActions from "./useAuthActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToken } from "./useToken";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackNavigationProp } from "../types/types";

interface UseUsers {
    isLoading: boolean, 
    login: (userID: string, userPW: string) => Promise<void>,
    register: (user: User) => Promise<boolean>
    modify: (accessToken: string, userInfo: UserInfo)=> Promise<void>
}

export const useUsers = (): UseUsers => {
    const navigation = useNavigation<ProfileStackNavigationProp>()
    const { authorize, access, getInfo, logout } = useAuthActions()
    const { getNewAccessToken } = useToken()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const login = async (userID: string, userPW: string): Promise<void> => {
        setIsLoading(true)

        const body: Body = {
            cls: 'Account',
            method: 'login',

            params: [
                userID, 
                userPW
            ]
        }
  
        const jsonBody: string = JSON.stringify(body)
    
        try {
            const res: Response = await axios.post(`${Config.AUTH_URL}`, jsonBody)

            if (res.data.code === -5002) {
                Alert.alert('알림', '로그인 세션이 만료되었습니다.')
                logout()
                setIsLoading(false)

                return
            }

            if (res.data.code !== 1000) {
                Alert.alert('error: ' + res.data.code, res.data.msg)
                setIsLoading(false)

                return
            }

            if (res.data.result?.token) {
                const token: Token = JSON.parse(res.data.result?.token)
                const loginData: LoginData = {
                    userInfo: res.data.result?.payload ?? {} as UserInfo,
                    token: token,
                }

                if (loginData.token) {
                    authorize(loginData.token.refreshToken ?? null)
                    access(loginData.token.accessToken ?? null);
                    getInfo(loginData.userInfo)
                        
                    await AsyncStorage.setItem('userInfo', JSON.stringify(loginData.userInfo))
                    await AsyncStorage.setItem('token', JSON.stringify(loginData.token))
                }
                setIsLoading(false)

                return
            }
            setIsLoading(false)

            return

        } catch (error: any) {
            errorHandler(error)
            setIsLoading(false)

            return
        }
    }   

    const register = async (user: User): Promise<boolean> => {
        setIsLoading(true)

        const body: Body = {
            cls: "Account",
            method: "create",
    
            params: [
                user.userID,
                user.userPW,
                user.nickname
            ]
        }
    
        const jsonBody: string = JSON.stringify(body)
    
        try {
            const res: Response = await axios.post(`${Config.AUTH_URL}`, jsonBody)
            
            if (res.data.code !== 1000) {
                Alert.alert('error: ' + res.data.code, res.data.msg)
                setIsLoading(false)
    
                return false
            }
    
            Alert.alert('알림', '가입되었습니다.')
            setIsLoading(false)
    
            return true
        } catch (error: any) {
            errorHandler(error)
            setIsLoading(false)

            return false
        }
    }

    const modify = async (accessToken: string, userInfo: UserInfo): Promise<void> => {
        setIsLoading(true)

        const body: Body = {
            cls: "Account",
            method: "modify",
    
            params: [
                userInfo.nick,
                userInfo.country,	
                userInfo.language,	
                userInfo.sms_alarm,	
                userInfo.push_alarm
            ]
        }
    
        const jsonBody: string = JSON.stringify(body)
    
        try {
            const res: Response = await axios.post(`${Config.AUTH_URL}`, jsonBody, {
                headers: {
                    "accessToken": accessToken
                }
            })
    
            if (res.data.code === -5002) {
                Alert.alert('알림', '로그인 세션이 만료되었습니다.')
                logout()
                setIsLoading(false)

                return 
            }

            if (res.data.code === -5000) {
                const newAccessToken: string = await getNewAccessToken()

                if (newAccessToken === '') {
                    Alert.alert('알림', '다시 시도해주세요.')
                    return
                }

                await modify(newAccessToken, userInfo)   

            } else if (res.data.code !== 1000) {
                Alert.alert('error: ' + res.data.code, res.data.msg)
                setIsLoading(false)
                return 
            }
    
            const modifiedUserInfo = res.data.result?.payload
    
            if (modifiedUserInfo) {
                Alert.alert('성공', '수정되었습니다.')

                getInfo(modifiedUserInfo)
                navigation.push('MyProfile')
            }
        } catch (error: any) {
            errorHandler(error)
        }
        setIsLoading(false)

        return
    }

    return { isLoading, login, register, modify }
}

const errorHandler = (error: any): void => {
    Alert.alert('알림', error)
}
