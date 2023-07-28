import { useSelector } from "react-redux";
import { RootState } from "../slices";
import axios from "axios";
import Config from "react-native-config";
import { Token, Body, Response } from "../lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import useAuthActions from "./useAuthActions";

interface UseToken {
    getNewAccessToken: ()=> Promise<string>
}

export function useAccessToken() {
    return useSelector((state: RootState) => state.auth.accessToken)
}

export function useRefreshToken() {
    return useSelector((state: RootState) => state.auth.refreshToken)
}

export const useToken = (): UseToken => {
    const { access, logout } = useAuthActions()

    const getNewAccessToken = async (): Promise<string> => {
        const rawToken = await AsyncStorage.getItem('token') ?? ''
                    
        if (rawToken === '') {
            return ''
        }
        
        const token: Token = JSON.parse(rawToken)
    
        const body: Body = {
            cls: "Account",
            method: "checkToken"
        }
    
        const jsonBody: string = JSON.stringify(body)
        try {
            const res: Response = await axios.post(`${Config.AUTH_URL}`, jsonBody, {
                headers: {
                    "refreshToken": token.refreshToken
                }
            })
    
            if (res.data.code === -5002) {
                Alert.alert('알림', '로그인 세션이 만료되었습니다.')
                logout()
    
                return ''
            }
            
            if (res.data.code !== 1000) return ''
    
            token.accessToken = res.data.result?.accessToken
    
            if (token.accessToken) {
                access(token.accessToken)
 
                return token.accessToken
            }
        } catch (error: any) {
            console.log(error)

            return ''
        }

        return ''
    }

    return { getNewAccessToken }
}
