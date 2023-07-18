import { Button } from '@/components';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import ScreenName from '@/components/ScreenName';
import Title from '@/components/Title';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React, { useState } from 'react';
import { Image, LogBox, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Verification({ route, navigation }) {
  const {
    onBackPress,
    onButtonPress,
    icon,
    title,
    subtitle,
    button_title,
    flag,
    index = 1,
  } = route.params;
  const [color, SetColor] = useState(['#E9584E', '#E62371']);
  function getTintColor(flag) {
    return flag ? ['#E9584E', '#E62371'] : ['#FFFFFF', '#FFFFFF'];
  }

  const styles = StyleSheet.create({
    round: {
      opacity: 0.1,
      position: 'absolute',
    },
    subtitle_style: {
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Medium,
      color: flag ? COLOR.GRAY_800 : 'white',
      textAlign: 'center',
    },
    title_style: {
      color: flag ? COLOR.BLACK80 : 'white',
    },
    screen_view_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    center_icon_container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    center_icon_filled_container: {
      height: 100,
      width: 100,
      borderRadius: 50,
      opacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    center_image: {
      height: 50,
      width: 50,
      tintColor: flag ? 'white' : COLOR.PRIMARY,
    },
  });

  function getBAckgroundcolor(flag) {
    return !flag ? ['#E9584E', '#E62371'] : ['#FFFFFF', '#FFFFFF'];
  }
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  return (
    <LinearGradient_primary
      colors={getBAckgroundcolor(flag)}
      style={{ flex: 1, paddingTop: 16 }}
      useAngle={flag}>
      <SafeAreaView style={{ flex: 1 }}>
        {onBackPress && <ScreenName onBackPress={onBackPress} />}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}>
          <View style={styles.screen_view_container}>
            <View style={styles.center_icon_container}>
              <LinearGradient_primary
                colors={getTintColor(flag)}
                style={[
                  styles.round,
                  {
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    position: 'relative',
                  },
                ]}
              />
              <LinearGradient_primary
                colors={getTintColor(flag)}
                style={[
                  styles.round,
                  {
                    height: 170,
                    width: 170,
                    borderRadius: 85,
                  },
                ]}
              />
              <LinearGradient_primary
                colors={getTintColor(flag)}
                style={[
                  styles.round,
                  {
                    position: 'absolute',
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  },
                ]}
              />
              <LinearGradient_primary
                colors={getTintColor(flag)}
                style={[
                  styles.round,
                  {
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  },
                ]}
              />

              <LinearGradient_primary
                colors={getTintColor(flag)}
                style={[styles.round, styles.center_icon_filled_container]}>
                <Image
                  style={styles.center_image}
                  resizeMode="contain"
                  source={icon}
                />
              </LinearGradient_primary>
            </View>
            <View style={{ marginTop: 44 }}>
              <Title title={title} style={styles.title_style} />
            </View>
            <View style={{ marginTop: 12 }}>
              <Title title={subtitle} style={styles.subtitle_style} />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Button
              title={button_title}
              flag={flag}
              onPress={onButtonPress}
              index={index}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient_primary>
  );
}

export default Verification;