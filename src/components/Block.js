import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const Block = (props) => {
    const swipe = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(swipe, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start()
    }, [])
    // const [modal, setmodal] = useState()
    // props.getData(modal)
    return (
        <Animated.View style={[styles.MainView, {
            opacity: swipe.interpolate({
                inputRange: [0, 0.5],
                outputRange: [0, 1],
            })
        }]}>
            <Animated.View style={[styles.Modal, {
                transform: [{
                    translateY: swipe.interpolate({
                        inputRange: [0.5, 1],
                        outputRange: [200, 0]
                    })
                }]
            }]}>

            </Animated.View>
        </Animated.View>
    )
}

export default Block

const styles = StyleSheet.create({
    MainView: {
        width: '100%',
        height: '100%',
        backgroundColor: "#00000050",
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    Modal: {
        backgroundColor: "#fff",
        height: "20%",
        width: "100%",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
})