import { DatingIcon, FriendsIcon, GreenTickIcon, NSAsIcon } from '@/assets';
import { strings } from '@/localization';
import CommonStyle from '@/theme/CommonStyle';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Title from './Title';

function UnBlockUserItem({
  index = 0,
  greenTick = false,
  name = '',
  time,
  photosource = '',
}) {
  function getStartColor(index) {
    switch (index) {
      case 0:
        return ['#E9584E', '#E62371'];
      case 1:
        return ['#5BAFEC', '#3406EC'];
      case 2:
        return ['#F9D423', '#E65C00'];
    }
  }
  const ImageList = [DatingIcon, FriendsIcon, NSAsIcon];
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View>
        <View
          style={{
            padding: 2,
          }}>
          <LinearGradient
            colors={getStartColor(index)}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            angle={index == 0 ? 223.07 : 120}
            useAngle={true}
            style={[
              styles.center_view,
              {
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 50,
                borderRadius: 25,
              },
            ]}>
            <View
              style={{ borderRadius: 20, padding: 2, backgroundColor: 'white' }}>
              <Image
                style={{ height: 40, width: 40, borderRadius: 20 }}
                source={require('@/assets/other/person.png')}
              />
            </View>
          </LinearGradient>
        </View>
        <View
          style={[
            CommonStyle.absoluteView,
            {
              margin: 1,
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
            },
          ]}>
          <Image
            style={{
              alignSelf: 'flex-end',
              height: 20,
              width: 20,
            }}
            source={ImageList[index]}
          />
        </View>
      </View>

      <View
        style={[
          styles.center_view,
          {
            flex: 1,
            marginStart: 15,
          },
        ]}>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Title title={name} style={styles.title} />
            {greenTick && (
              <Image
                source={GreenTickIcon}
                style={{ height: 16, width: 16, marginStart: 4 }}
              />
            )}
          </View>

          <Title
            title={time}
            style={[
              styles.time_style,
              {
                fontSize: fontSize.small,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.unblock_button}>
        <Text
          style={{
            color: COLOR.GRAY_800,
            marginHorizontal: 12,
            marginVertical: 10,
          }}>
          {strings.blocked_user_screen.unblocked}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inactive_tab: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  inactive_text: {
    color: COLOR.GRAY_800,
  },
  active_tab: {},
  title: {
    fontFamily: fontFamily.Medium,
    fontSize: fontSize.medium,
  },
  time_style: {
    color: COLOR.GRAY_800,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.xmedium,
  },
  unblock_button: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR.GRAY_800,
  },
});
export default UnBlockUserItem;
