import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackNavigationProp, RootStackParamList } from "../../types/types"
import { TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MainTab from "./mainTab/MainTab"
import NoticeTab from "./mainTab/screens/noticeTab/NoticeTab"
import Reservation from "./screens/Reservation"
import ScreenLogin from "./screens/ScreenLogin"
import Setting from "./screens/Setting"
import DisclosureInfo from "./settings/DisclosureInfo"
import Notice from "./webViews/Notice"
import Event from "./webViews/Event"
import { useRefreshToken, useToken } from "../../hooks/useToken"
import AuthStack from "./authStack/AuthStack"
import { useEffect, useState } from "react"
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Token, UserInfo } from "../../lib/types"
import useAuthActions from "../../hooks/useAuthActions"


const Stack = createNativeStackNavigator<RootStackParamList>()

function RootStack(): JSX.Element {
    const { getNewAccessToken } = useToken()
	const { authorize, getInfo } = useAuthActions()
	const navigation = useNavigation<RootStackNavigationProp>()
	const refreshToken = useRefreshToken()

	useEffect((): void => {
		async function autoLogin (): Promise<void> {
			const accessToken = await getNewAccessToken()
			if (accessToken !== '') {
				
				const rawToken = await AsyncStorage.getItem('token') ?? ''
				const rawUserInfo = await AsyncStorage.getItem('userInfo') ?? ''
                    
				if (rawToken === '') {
					return 
				}
				
				const token: Token = JSON.parse(rawToken)
				const userInfo: UserInfo = JSON.parse(rawUserInfo)

				getInfo(userInfo)
				authorize(token.refreshToken ?? '')
    
			}
			
			SplashScreen.hide()
		}

		autoLogin()
	}, [])

	
	const onPress = (): void => {
		navigation.goBack()
	}

	return (
		<Stack.Navigator>
			{ refreshToken ? ( <>
				<Stack.Screen name='MainTab' component={ MainTab } options={{ headerShown: false }} />
				<Stack.Screen name='ScreenLogin' component={ ScreenLogin } options={{ headerTitle: '스크린로그인', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />
				<Stack.Screen name='Reservation' component={ Reservation } options={{ headerTitle: '스크린 예약 페이지', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />
				<Stack.Screen name='Setting' component={ Setting } options={{ headerTitle: '설정', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />
				<Stack.Screen name='NoticeTab' component={ NoticeTab } options={{ headerTitle: '알림', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />

				<Stack.Screen name='Notice' component={ Notice }  options={{ headerTitle: '공지사항', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />

				<Stack.Screen name='Event' component={ Event }  options={{ headerTitle: '이벤트', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />

				<Stack.Screen name='Info' component={ DisclosureInfo }  options={{ headerTitle: '정보 공개', 
					headerBackVisible: true, headerTitleStyle: { fontSize: 14, fontWeight: 'bold'},
					headerLeft: (): JSX.Element => <TouchableOpacity onPress={ onPress } />
				}} />
			</>
			) : (
				<Stack.Screen name='Auth' component={ AuthStack } options={{ headerShown: false }} />
			) }


			
		</Stack.Navigator>
	)
}

export default RootStack
