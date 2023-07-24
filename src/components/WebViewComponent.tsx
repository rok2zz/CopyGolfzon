import React, { useEffect, useRef, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { RootStackNavigationProp, RootStackParamList, ScreenName } from '../types/types';
import { useNavigation } from '@react-navigation/native';

interface Props {
    uri: string
}

function WebViewComponent({ uri }: Props): JSX.Element  {
    const navigation = useNavigation<RootStackNavigationProp>()
    const webView = useRef<WebView>(null)
    const [isCanGoBack, setIsCanGoBack] = useState(false)

    const onPressHardwareBackButton = (): boolean => {
        if (webView.current && isCanGoBack) {
            webView.current.goBack()
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton)
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton)
        }
    }, [isCanGoBack])

    const handleWebViewNavigation = (navState: WebViewNavigation): void => {
        setIsCanGoBack(navState.canGoBack)
    }

    const handleMessage = (event: WebViewMessageEvent) => {
        const messageData: { type: string, data: string } = JSON.parse(event.nativeEvent.data)
        const screenName = messageData.type 
        const params = { uri: messageData.data }

        navigation.push(screenName as ScreenName, params)
    }

    return (
        <WebView
            ref={ webView }
            source={{ uri: uri }}
            onNavigationStateChange={ handleWebViewNavigation }
            style={{ flex: 1 }}
            onMessage={ handleMessage }
        />
    )
}

export default WebViewComponent
