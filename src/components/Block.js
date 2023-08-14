import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Block = () => {
    return (
        <View style={styles.MainView}>
            <View style={{ backgroundColor: "#fff", height: "20%", width: "100%", }}>
            </View>
        </View>
    )
}

export default Block

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: "#00000050",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})