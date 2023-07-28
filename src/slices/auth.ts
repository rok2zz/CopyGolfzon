import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserInfo } from "../lib/types"

interface AuthState {
    accessToken?: string | null,
    refreshToken?: string | null,
    userInfo: UserInfo
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    userInfo: {
        id: '',
        nick: '',
        country: '',
        language: '',
        sms_alarm: '',
        push_alarm: ''
    }
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        authorize(state, action: PayloadAction<string | null>) {
            state.refreshToken = action.payload
        },
        access(state, action: PayloadAction<string | null>) {
            state.accessToken = action.payload
        },
        getInfo(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload
        },
        logout() {
            return initialState
        }
    }
})

export default authSlice.reducer
export const { authorize, access, logout, getInfo } = authSlice.actions