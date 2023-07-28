import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MainTabParamList } from '../../../types/types';
import HomeTabHeaderLeft from '../../../components/homeTabComponents/HomeTabHeaderLeft';
import HomeTabHeaderRight from '../../../components/homeTabComponents/HomeTabHeaderRight';
import MenuHeaderRight from '../../../components/MenuHeaderRight';
import Menu from './screens/Menu';
import HomeTab from './screens/homeTab/HomeTab';
import FeedTab from './screens/feedTab/FeedTab';
import FriendTab from './screens/friendTab/FriendTab';
import ProfileStack from './screens/profileStack/ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>()

function MainTab(): JSX.Element {

    return (
        <>
            <View style={ styles.container }>
                <Tab.Navigator screenOptions={{ tabBarShowLabel: true, tabBarActiveTintColor: '#6200ee', 
                    tabBarLabelStyle: { padding: 5 } }}>
                    <Tab.Screen name='HomeTab' component={ HomeTab } options={{ tabBarLabel: '홈',
                        tabBarIcon: ({ color }): JSX.Element => <Icon name='home' size={ 24 } color={ color } />, headerTitle: '',
                        headerLeft: () => <HomeTabHeaderLeft />, headerRight: () => <HomeTabHeaderRight />,
                        headerBackgroundContainerStyle: { borderBottomColor: 'white'}
                    }} />
                    <Tab.Screen name='FriendTab' component={ FriendTab } options={{ tabBarLabel: '골프친구',
                        tabBarIcon: ({ color }): JSX.Element => <Icon name='group' size={ 24 } color={ color } />
                    }} />
                    <Tab.Screen name='FeedTab' component={ FeedTab } options={{ tabBarLabel: '피드',
                        tabBarIcon: ({ color }): JSX.Element => <Icon name='dynamic-feed' size={ 24 } color={ color } />
                    }} />
                    <Tab.Screen name='ProfileStack' component={ ProfileStack } options={{ tabBarLabel: 'MY',
                        tabBarIcon: ({ color }): JSX.Element => <Icon name='person' size={ 24 } color={ color } />
                    }} />
                    <Tab.Screen name='Menu' component={ Menu } options={{ tabBarLabel: '전체메뉴',
                        tabBarIcon: ({ color }): JSX.Element => <Icon name='app-settings-alt' size={ 24 } color={ color } />,
                        headerRight: () => <MenuHeaderRight />, headerTitle: '전체메뉴',
                        headerBackgroundContainerStyle: { borderBottomColor: 'white'}
                    }} />
                </Tab.Navigator>
            </View>
        </>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,

        zIndex: 0
    }
})

export default MainTab
