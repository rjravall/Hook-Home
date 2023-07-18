// For Use This File You Must Install MaskedView 
// https://github.com/react-native-masked-view/masked-view   <--------  use this link for MaskedView installation

import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';

const ShapedImage = ({
    shape,
    source,
    width,
    height,
    borderWidth,
    position,
    margin,
    padding,
    top,
    bottom,
    left,
    right,
}) => {

    return (
        <MaskedView
            style={{
                width: width,
                height: height,

                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'center',

                position: position,
                zIndex: 2,

                margin,
                marginTop: margin ? margin["top"] : 0,
                marginBottom: margin ? margin["bottom"] : 0,
                marginLeft: margin ? margin["left"] : 0,
                marginRight: margin ? margin["right"] : 0,

                top: top,
                right: right,
                left: left,
                bottom: bottom,

                padding,
                paddingTop: padding ? padding["top"] : 0,
                paddingBottom: padding ? padding["bottom"] : 0,
                paddingLeft: padding ? padding["left"] : 0,
                paddingRight: padding ? padding["right"] : 0,
            }}
            maskElement={
                <View
                    style={{
                        // Transparent background because mask is based off alpha channel.
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#00000000',
                        padding: borderWidth,
                        alignItems: 'center',
                    }}
                >
                    {shape}
                </View>
            }>
            {/* Shows behind the mask, you can put anything here, such as an image */}
            <Image
                source={{ uri: source }}
                style={{ width: '100%', height: '150%' }}
                resizeMode="cover"
            />
        </MaskedView>
    )
}

export default ShapedImage

const styles = StyleSheet.create({})