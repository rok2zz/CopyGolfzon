import { StyleSheet, Text, View } from "react-native"


function HomeTabHeaderLeft(): JSX.Element {

    return (
        <View style={ styles.container }> 
            <Text> nick name </Text>
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