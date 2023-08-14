import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { AppIcon, BgAppIcon } from '@/assets';

const Modall = (props) => {
    const { colors } = useTheme();
    const [modal, setmodal] = useState()
    props.getData(modal)
    return (
        <View style={styles.MainView}>

            <View style={styles.body}>
                {/* <ImageBackground
                    tintColor="#E6256F"
                    source={BgAppIcon}
                    style={styles.background_Image}
                /> */}
                <Image
                    tintColor={colors.primary}
                    source={AppIcon}
                    resizeMode={'contain'}
                    style={styles.app_Icon}
                />
                <Text style={styles.maintext}>{props.text}</Text>
                <TouchableOpacity style={styles.button} onPress={(e) => { setmodal(false) }}>
                    <Text style={styles.tex}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Modall

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
        width: "80%",
        height: "25%",
        justifyContent: 'space-between',
        borderRadius: 20,
        backgroundColor: "#ffffff",
        elevation: 30,
        padding: 20,
    },
    button: {
        backgroundColor: "#E6256F",
        width: "35%",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
    },
    tex: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 'bold'
    },
    maintext: {
        marginTop: 5,
        color: "#000"


    },
    background_Image: {
        width: 241,
        height: 238,
        opacity: 0.06,
    },
    app_Icon: {
        height: 80,
        width: 80,
        tintColor: "#E6256F",//colors.primary,
        opacity: 1,
        alignSelf: 'center',

    },
})