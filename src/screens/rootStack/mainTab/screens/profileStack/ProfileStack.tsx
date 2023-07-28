import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProfileStackParamList } from "../../../../../types/types"
import ModifyProfile from "./screens/ModifyProfile"
import MyProfile from "./screens/MyProfile"

const Stack = createNativeStackNavigator<ProfileStackParamList>()

function ProfileStack(): JSX.Element {

    return (
        <Stack.Navigator>
            <Stack.Screen name="MyProfile" component={ MyProfile } options={{ headerShown: false }} />
            <Stack.Screen name="ModifyProfile" component={ ModifyProfile } options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ProfileStack