import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackNavigationProp, ScreenName } from "../../../types/types";


interface ListProps {
    list: string[],
    screen: string[]
}

const SettingList = ({ list, screen }: ListProps): JSX.Element => {
    const navigation = useNavigation<RootStackNavigationProp>()

    const listTitle = list.map((listItem: string, index: number): JSX.Element => (
        <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
            android_ripple={{ color: '#ededed' }} onPress={ (): void => {
                const screenName = screen[index]
                navigation.push(screenName as ScreenName)
            } }>
            <Text style={ styles.text } key={ listItem }>{ listItem }</Text>
            <Text> &gt; </Text>
        </Pressable>

    ))
    return (
        <View style={ styles.settingContainer }> 
            { listTitle }
        </View>
    )
}

function SettingScreen(): JSX.Element {
    const userSettingList = ['회원정보', '친구 관리']
    const userSettingScreen = ['Profile', 'FriendSetting' ]
    const appSettingList = ['정보 공개', '알림 설정', '나스모, 동영상 자동재생']
    const appSettingScreen = ['Info', 'ToastTest', 'VideoSetting']
    const noticeList = ['공지사항', 'FAQ', '서비스 문의', '광고제휴센터', '이용약관', '개인정보 처리방침']

    return (
        <View style={ styles.container }>
            <SettingList list={ userSettingList } screen={ userSettingScreen} />
            <SettingList list={ appSettingList } screen={ appSettingScreen} />
            <SettingList list={ ['스크린 설정'] } screen={ ['ScreenSetting']} />
            <SettingList list={ noticeList } screen={ appSettingScreen} />

            

            <View style={[ styles.settingContainer, { marginTop: 0 }]}>
                <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                    onPress={ () => {} } android_ripple={{ color: '#ededed' }}>
                    <Text style={ styles.text }>버전정보</Text>
                    <Text> 7.4.5 </Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#ededed'
    },
    settingContainer: {
        marginTop: 15,

        borderBottomWidth: 0,

        backgroundColor: 'white'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        
        padding: 10,

        borderBottomWidth: 0.3
    },
    text: {
        flex: 1,

        fontSize: 11,
        fontWeight: 'bold',

        color: 'black'
    }
})

export default SettingScreen