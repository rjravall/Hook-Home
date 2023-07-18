import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import ShapedImage from './ShapedImage'


const CustomeMarkerShape = ({ source }) => {
    return (
        <View style={{
            width: 50,
            height: 56,
            alignItems: 'center',
        }}>
            <View style={{
                width: '100%',
                height: '100%',
                zIndex: -1,
                alignItems: 'center',
            }}>
                <View
                    style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        borderRadius: 7,
                        shadowColor: '#000',
                        shadowOffset: { height: 5, width: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        backgroundColor: '#fff',
                        borderRadius: 13,
                        elevation: 10,
                        zIndex: -1,
                    }} />
                <View
                    style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        backgroundColor: '#fff',
                        borderRadius: 13,
                        position: 'absolute',
                        zIndex: 0,
                    }} />
                <View
                    style={{
                        width: "36%",
                        aspectRatio: 1 / 1,
                        backgroundColor: '#fff',
                        transform: [
                            {
                                rotateZ: '45deg',
                            },
                        ],
                        borderBottomEndRadius: 7,
                        bottom: 0,
                        shadowColor: '#000',
                        shadowOffset: { height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        position: 'absolute',
                        elevation: 10,
                        zIndex: -1,
                    }}
                />
            </View>
            <ShapedImage
                source={source}
                width={50}
                height={56}
                borderWidth={3}
                position={'absolute'}
                shape={
                    <View style={{
                        height: "100%",
                        width: "100%",
                        alignItems: 'center',
                    }}>
                        <View
                            style={{
                                width: '100%',
                                aspectRatio: 1 / 1,
                                backgroundColor: '#000',
                                borderRadius: 10,
                            }} />
                        <View
                            style={{
                                width: "36%",
                                aspectRatio: 1 / 1,
                                backgroundColor: '#000',
                                transform: [
                                    {
                                        rotateZ: '45deg',
                                    },
                                ],
                                // borderRadius: 5,
                                borderBottomEndRadius: 5,
                                bottom: 1,
                                position: 'absolute',
                            }}
                        />
                    </View>
                }
            />
        </View>

    )
}

export default CustomeMarkerShape

const styles = StyleSheet.create({})