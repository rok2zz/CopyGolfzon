import React from 'react';
import { StyleSheet } from 'react-native';
import { HomeTabParamList } from '../../../../../types/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screen } from 'react-native-screens';
import Field from './screens/Field';
import Home from './screens/Home';
import Media from './screens/Media';
import Practice from './screens/Practice';
import Shopping from './screens/Shopping';

const Tab = createMaterialTopTabNavigator<HomeTabParamList>()

function HomeTab(): JSX.Element {
    return (
        <>
        <Tab.Navigator screenOptions={{ tabBarItemStyle: { width: 'auto', height: 40 }, tabBarAndroidRipple: { borderless: false },
            tabBarLabelStyle: { fontSize: 13, fontWeight: '900' }, tabBarIndicatorStyle: {  backgroundColor: 'black' }
            }} >
            <Tab.Screen name='Home' component={ Home } options={{ title: '홈' }}  />
            <Tab.Screen name='Screen' component={ Screen } options={{ title: '스크린' }} />
            <Tab.Screen name='Field' component={ Field} options={{ title: '필드' }} />
            <Tab.Screen name='Shopping' component={ Shopping } options={{ title: '쇼핑' }} />
            <Tab.Screen name='Practice' component={ Practice } options={{ title: '연습' }} />
            <Tab.Screen name='Media' component={ Media } options={{ title: '미디어' }} />
        </Tab.Navigator>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    }
})

export default HomeTab
