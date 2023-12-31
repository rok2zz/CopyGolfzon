import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"

export type ScreenName = keyof RootStackParamList

// RootStack
export type RootStackParamList = {
	MainTab: undefined,
	ScreenLogin: undefined,
	NoticeTab: undefined,
	Reservation: undefined,
	Setting: undefined,
	Auth: undefined,

	Notice: {
		uri: string
	},
	Event: {
		uri: string
	},
	Info: undefined,
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>
export type NoticeStackProp = NativeStackScreenProps<RootStackParamList, 'Notice'>;
export type EventStackProp = NativeStackScreenProps<RootStackParamList, 'Event'>;

// AuthStack

export type AuthStackParamList = {
	Login: undefined,
	Register: undefined
}

export type AuthStackNavigationScreenParams = NavigatorScreenParams<AuthStackParamList>
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>

// MainTab
export type MainTabParamList = {
    HomeTab: undefined,
	FriendTab: undefined,
	FeedTab: undefined,
	ProfileStack: undefined,
	Menu: undefined
}

export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>
export type MainTabNavigationProp = CompositeNavigationProp<RootStackNavigationProp, BottomTabNavigationProp<MainTabParamList>>
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>

// NoticeTab
export type NoticeTabParamList = {
	Notice: undefined,
	Memo: undefined,
	Special: undefined
}

// HomeTab
export type HomeTabParamList = {
	Home: undefined,
	Screen: undefined,
	Field: undefined,
	Shopping: undefined,
	Practice: undefined,
	Media: undefined
}
export type HomeTabNavigationProps = CompositeNavigationProp<RootStackNavigationProp, BottomTabNavigationProp<HomeTabParamList>>

// FriendTab

export type FriendTabParamList = {
	Friend: undefined,
	Competition: undefined
}

// FeedTab

export type FeedTabParamList = {
	Feed: undefined
}

// ProfileStack

export type ProfileStackParamList = {
	MyProfile: undefined,
	ModifyProfile: undefined
}

export type ProfileStackNavigationScreenParams = NavigatorScreenParams<ProfileStackParamList>
export type ProfileStackNavigationProp = NativeStackNavigationProp<ProfileStackParamList>
// MenuTab
