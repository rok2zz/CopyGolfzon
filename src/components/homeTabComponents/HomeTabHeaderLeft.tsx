import { StyleSheet, Text, View } from "react-native"
import useUserInfo from "../../hooks/useUserInfo"


function HomeTabHeaderLeft(): JSX.Element {
    const nickname = useUserInfo().nick ?? ''

    return (
        <View style={ styles.container }> 
            <Text>{ nickname }</Text>
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
    }
})

export default HomeTabHeaderLeft