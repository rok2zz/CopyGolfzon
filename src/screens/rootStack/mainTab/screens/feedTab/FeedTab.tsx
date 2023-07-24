import React from 'react';
import { StyleSheet } from 'react-native';
import { FeedTabParamList } from '../../../../../types/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from './screens/FeedScreen';

const Tab = createMaterialTopTabNavigator<FeedTabParamList>()

function FeedTab(): JSX.Element {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Feed' component={ FeedScreen } options={{ title: '피드' }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default FeedTab
