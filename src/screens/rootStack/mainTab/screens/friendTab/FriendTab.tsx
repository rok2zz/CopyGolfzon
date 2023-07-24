import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FriendTabParamList } from '../../../../../types/types';
import Competition from './screens/Competition';
import Friend from './screens/Friend';

const Tab = createMaterialTopTabNavigator<FriendTabParamList>()

function FriendTab(): JSX.Element {
    return (
        <Tab.Navigator  screenOptions={{ tabBarItemStyle: { width: 60 }, tabBarScrollEnabled: true, tabBarLabelStyle: { width: 100, fontSize: 13, fontWeight: 'bold' }, 
            tabBarIndicatorStyle: { width: 40, marginHorizontal: 10 } }}  >
            <Tab.Screen name='Friend' component={ Friend } options={{ title: '친구' }} />
            <Tab.Screen name='Competition' component={ Competition } options={{ title: '기록 비교' }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default FriendTab
