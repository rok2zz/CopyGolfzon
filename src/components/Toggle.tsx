import { useState, useEffect } from "react"
import { Pressable, Platform, Text, Switch, StyleSheet, View } from "react-native"

interface List {
    id: number,
    title: string,
    contents: string
}
interface Props {
    list: List[]
}

function Toggle({ list }: Props): JSX.Element {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = (): void => { 
        setIsEnabled(previousState => !previousState)
    }

    useEffect((): void => {
        console.log('switch: ' + isEnabled)
        
    }, [isEnabled])

    const listTitle = list.map((listItem: List): JSX.Element => (
        <Pressable style={({ pressed }) => [ styles.presssable, Platform.OS === 'ios' && pressed && { backgroundColor: '#efefef' }]}
            onPress={ () => {} } android_ripple={{ color: '#ededed' }}>
            <View style={ styles.textContainer }>
                <Text style={ styles.title } key={ listItem.id }>{ listItem.title }</Text>
                <Text style={ styles.contents }>{ listItem.contents }</Text>
            </View>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={ isEnabled ? '#f5dd4b' : '#f4f3f4' }
                ios_backgroundColor="#3e3e3e"
                onValueChange={ toggleSwitch }
                value={ isEnabled }
            />
        </Pressable>
    ))
    return (
        <View style={ styles.container }> 
            { listTitle }
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        marginTop: 15,

        backgroundColor: 'white'
    },
    presssable: {
        height: 70,

        flexDirection: 'row',
        alignItems: 'center',
        
        padding: 10,

        borderBottomWidth: 0.2,
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontSize: 11,
        fontWeight: 'bold',

        paddingBottom: 10,

        color: 'black'
    },
    contents: {
        fontSize: 9,

        fontWeight: 'bold'
    }
})

export default Toggle