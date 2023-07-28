
export interface User {
    userID: string,
    userPW: string,
    nickname: string
}

export interface UserInfo {
    uid?: number,
    type?: number,
    status?: string,
    country: string,
    language: string,
    sms_alarm: string,
    push_alarm: string,
    id: string,
    nick: string,
}

export interface LoginData {
    userInfo: UserInfo,
    token?: Token
}

export interface Token {
    accessToken?: string | null,
    refreshToken?: string | null
}

export interface ResponseResult {
    id?: string,
    nick?: string,

    payload?: UserInfo,
    token?: string,
    accessToken?: string
}

export interface Response {
    data: { 
        code?: number,
        msg?: string,

        result?: ResponseResult
    }
}

export interface Body {
    cls: string,
    method: string,
    params?: string[]
}