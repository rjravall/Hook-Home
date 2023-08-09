import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Modal = ({ text }) => {

    console.log("TEXT================ : ", text)
    return (
        <View style={styles.MainView}>
            <View style={styles.body}>
                <Text style={styles.maintext}>{text}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.tex}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Modal

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: "#00000050",
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "25%",
        width: "80%",
        borderRadius: 20,
        backgroundColor: "#ffffff",
        elevation: 30
    },
    button: {
        backgroundColor: "#E6256F",
        width: "35%",
        height: "20%",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    tex: {
        color: "#fff",
        fontSize: 15
    },
    maintext: {
        marginTop: 40,
        color: "#000"
    }
})