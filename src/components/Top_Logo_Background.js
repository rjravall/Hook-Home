import { AppIcon, BgAppIcon } from '@/assets';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, View, StyleSheet } from 'react-native';

function Top_Logo_Background(props) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: 'white',
      top: -28,
    },
    background_Image: {
      width: 241,
      height: 238,
      opacity: 0.06,
    },
    app_Icon: {
      height: 100,
      width: 100,
      tintColor: "#E6256F",//colors.primary,
      opacity: 1,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 22,
    },
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        tintColor="#E6256F"
        source={BgAppIcon}
        style={styles.background_Image}
      />
      <Image
        tintColor={colors.primary}
        source={AppIcon}
        resizeMode={'contain'}
        style={styles.app_Icon}
      />
    </View>
  );
}

export default Top_Logo_Background;
