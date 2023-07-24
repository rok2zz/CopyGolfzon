import { StyleSheet, Text, View } from "react-native";

function ScreenLoginScreen(): JSX.Element {

    return (
        <View style={ styles.container }>
            <Text>스크린 로그인 페이지</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

        fontSize: 24
    }
})

export default ScreenLoginScreen