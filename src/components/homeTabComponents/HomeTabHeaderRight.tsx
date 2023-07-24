import { useNavigation } from "@react-navigation/native"
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RootStackNavigationProp } from "../../types/types"

function ScreenLoginButton(): JSX.Element {
    const navigation = useNavigation<RootStackNavigationProp>()

    const onPress = (): void => {
        navigation.push('ScreenLogin')
    }

    return (
        <View style={ styles.buttonContainer }>
            <Pressable style={({ pressed }) => [ styles.button, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                onPress={ onPress } android_ripple={{ color: '#ededed' }}>
                <Text style={ styles.text }>스크린 로그인</Text>
            </Pressable>
        </View>
    )
}

function NoticeButton(): JSX.Element {
    const navigation = useNavigation<RootStackNavigationProp>()

    const onPress = (): void => {
        navigation.push('NoticeTab')
    }

    return (
        <View>
            <Pressable style={({ pressed }) => [ styles.noticeContainer, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
                onPress={ onPress } android_ripple={{ color: '#ededed' }}>
                <Icon name='notifications-none' size={ 24 }  />
            </Pressable>
        </View>
    )
}

function HomeTabHeaderLeft(): JSX.Element {

    return (
        <View style={ styles.container }> 
            <ScreenLoginButton />
            <NoticeButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 48,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 8
    },
    buttonContainer: {
        width: 80
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-between',
        
        paddingTop: 3,
        paddingBottom: 4,

        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'grey'
    },
    text: {
        fontSize: 11,
        fontWeight: 'bold',
        
        color: 'black'
    },
    noticeContainer: {
        marginLeft: 10
    }
})

export default HomeTabHeaderLeft