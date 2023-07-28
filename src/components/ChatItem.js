import { DatingIcon, FriendsIcon, GreenTickIcon, NSAsIcon } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient_primary from './LinearGradient_primary';
import Title from './Title';

function ChatItem({
  index = 0,
  person_name = '',
  message = '',
  photosource = '',
  numberOfMsg,
  greenTick = false,
  time,
  tab,
  onItemPress,
  Data
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
  React.useEffect(() => { }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress();
      }}
      style={{
        flexDirection: 'row',
      }}>
      <View style={styles.center_view}>
        <View style={{ padding: 2 }}>
          <LinearGradient_primary
            colors={getStartColor(index)}
            angle={index == 0 ? 223.07 : 120}
            style={[styles.center_view, styles.image_background]}>
            <View style={styles.person_img_container}>
              <Image style={styles.person_image} source={photosource} />
            </View>
          </LinearGradient_primary>
        </View>
        <View style={[CommonStyle.absoluteView, styles.logo_img_container]}>
          <Image style={styles.logo_image} source={{ uri: Data?.chatUser?.mode?.icon }} />
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
        <View style={{ flexDirection: 'row' }}>
          <Title title={person_name} touchableStyle={{}} style={styles.title} />
          {greenTick && (
            <Image source={GreenTickIcon} style={styles.greentick} />
          )}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Title
              title={time}
              touchableStyle={{
                alignSelf: 'flex-end',
              }}
              style={[
                styles.sub_title,
                {
                  fontSize: fontSize.small,
                },
              ]}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Title
            title={message}
            touchableStyle={{
              alignSelf: 'flex-end',
            }}
            style={[
              styles.sub_title,
              {
                fontSize: fontSize.xmedium,
              },
            ]}
          />
          {numberOfMsg && (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <LinearGradient_primary
                style={[styles.center_view, styles.number_of_msg_container]}>
                <Title title={numberOfMsg} style={styles.number_msg} />
              </LinearGradient_primary>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logo_img_container: {
    margin: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  center_view: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  person_img_container: {
    borderRadius: 20,
    padding: 2,
    backgroundColor: 'white',
  },
  number_of_msg_container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  number_msg: {
    fontSize: fontSize.small,
    color: 'white',
    alignSelf: 'center',
  },
  greentick: { height: 16, width: 16, marginStart: 4 },
  person_image: { height: 40, width: 40, borderRadius: 20 },
  logo_image: {
    alignSelf: 'flex-end',
    height: 20,
    width: 20,
  },
  title: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.Medium,
    color: COLOR.BLACK80,
  },
  sub_title: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Regular,
    color: COLOR.GRAY_800,
  },
  center_view: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  image_background: {
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
export default ChatItem;
