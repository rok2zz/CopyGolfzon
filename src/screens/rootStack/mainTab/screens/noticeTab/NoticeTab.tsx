import { StyleSheet } from "react-native";
import { NoticeTabParamList } from "../../../../../types/types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Memo from "./screens/Memo";
import Notice from "./screens/Notice";
import Special from "./screens/Special";

const Tab = createMaterialTopTabNavigator<NoticeTabParamList>()

function NoticeTab(): JSX.Element {
    return (
        <Tab.Navigator screenOptions={{ tabBarLabelStyle: { width: 100, fontSize: 13, fontWeight: 'bold' }, tabBarBounces: true,
            tabBarIndicatorStyle: { backgroundColor: 'black' } }} >
            <Tab.Screen name='Notice' component={ Notice } options={{ title: '알림' }}  />
            <Tab.Screen name='Memo' component={ Memo } options={{ title: '개인쪽지' }} />
            <Tab.Screen name='Special' component={ Special } options={{ title: '스페셜 친구' }} />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,



        fontSize: 11
    }
})

export default NoticeTab