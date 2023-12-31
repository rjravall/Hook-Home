import { LikedIcon, NudgedIcon, MatchIcon } from '@/assets';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Title from './Title';
import { strings } from '@/localization';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';

function NotificationItem({ type, userid, name, index, time = '' }) {

  const navigation = useNavigation()
  function getImage(index) {
    switch (index) {
      case 0:
        return LikedIcon;
      case 1:
        return NudgedIcon;
      case 2:
        return MatchIcon;
    }
  }

  function getBackGroundColor(index) {
    switch (index) {
      case 0:
        return '#E6256F';
      case 1:
        return '#1E90FF';
      case 2:
        return '#FF7F50';
    }
  }

  function getMessage(index) {
    switch (index) {
      case 0:
        return strings.notification_item.like;
      case 1:
        return strings.notification_item.nudge;
      case 2:
        return strings.notification_item.match;
    }
  }
  const styles = StyleSheet.create({
    roundShape: {
      height: 44,
      width: 44,
      marginVertical: 16,
      borderRadius: 22,
      backgroundColor: getBackGroundColor(index),
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagestyleimagestyle: {
      height: 20,
      width: 20,
    },
    person_name: {
      fontSize: fontSize.medium,
    },
    person_other_font: {
      fontFamily: fontFamily.Regular,
    },
    time_font: {
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Regular,

      color: COLOR.GRAY_800,
    },
  });

  return (
    <TouchableOpacity onPress={() => {

      navigation.navigate(NAVIGATION.person_details, {
        userid: userid,
        type: type,
        notification: 'true'

      });
      console.log("USER ID == : ", userid)
      console.log("USER ID == : ", type)
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.roundShape}>
          <Image source={getImage(index)} style={styles.imagestyle} />
        </View>

        <View style={{ marginStart: 12 }}>
          <View style={{ flexDirection: 'row' }}>
            <Title title={name} style={styles.person_name} />
            <Title
              title={' ' + getMessage(index)}
              style={[styles.person_name, styles.person_other_font]}
            />
          </View>
          {time && <Title title={time} style={[styles.time_font]} />}
        </View>
      </View>

    </TouchableOpacity>

  );
}

export default NotificationItem;
