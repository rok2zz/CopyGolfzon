import React from "react";
import { StyleSheet, View } from "react-native";
import Toggle from "../../../components/Toggle";

function DisclosureInfo(): JSX.Element {
    const list = [
        { id: 1, title: '프로필 공개', contents: '나의 프로필을 다른 회원에게 공개합니다.' }, 
        { id: 2, title: '랭킹 공개', contents: '골프친구에게 나의 랭킹을 공개합니다.'  },
        { id: 3, title: 'ID, 닉네임 검색 허용', contents: '나를 ID나 닉네임으로 검색할 수 있습니다.'  },
    ]

    return (
        <View style={ styles.container }>
            <Toggle list={ list } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#ededed'
    }
})

export default DisclosureInfo