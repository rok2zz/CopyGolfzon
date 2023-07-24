import { StyleSheet, Text, View } from "react-native";

function Notice(): JSX.Element {

    return (
        <View style={ styles.container }>
            <Text>알림 페이지</Text>
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

export default Notice