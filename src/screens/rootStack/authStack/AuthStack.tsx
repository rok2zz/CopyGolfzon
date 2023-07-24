import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../../types/types"
import Login from "./screens/Login"
import Register from "./screens/Register"

const Stack = createNativeStackNavigator<AuthStackParamList>()

function AuthStack(): JSX.Element {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={ Login } options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={ Register } options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthStack