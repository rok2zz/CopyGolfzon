import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import RootStack from "./screens/rootStack/RootStack"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./slices"

const store = configureStore({ reducer: rootReducer })

function App(): JSX.Element {

	return (
		<Provider store={ store }>
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
		</Provider>
	)
}

const styles = StyleSheet.create({

})

export default App
