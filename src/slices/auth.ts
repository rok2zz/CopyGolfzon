import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: null
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        authorize(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
        logout(state) {
            state.token = null
        }
    }
})

export default authSlice.reducer
export const { authorize, logout } = authSlice.actions