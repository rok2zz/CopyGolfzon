import React, { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid, BackHandler } from 'react-native';
import WebViewComponent from '../../../../../../components/WebViewComponent';

function Home(): JSX.Element {
    const backPressedTimeRef = useRef(0)

    useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				const currentTime = Date.now()
				const timeDiff = currentTime - backPressedTimeRef.current

				if (timeDiff < 2000) {
					BackHandler.exitApp();
				} else {
					backPressedTimeRef.current = currentTime
					ToastAndroid.show('뒤로가기 버튼을 한번 더 누르면 종료됩니다.', ToastAndroid.SHORT)
				}

				return true
			}

			BackHandler.addEventListener('hardwareBackPress', onBackPress)

			return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
		}, [])
	)
			
	return (
		<WebViewComponent uri='www.naver.com' />
	)
}
  
export default Home
