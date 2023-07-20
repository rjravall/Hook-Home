import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { COLOR } from '@/theme/theme';
import { IntroEllipseBG, PartnerTextImage } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '@/localization';
import { useEffect } from 'react';
import { API_KEY } from '../SignUp/Map/API_KEY';
import Geocoder from 'react-native-geocoding';

export default function Introduction() {
  const navigation = useNavigation();
  Geocoder.init(API_KEY);
  const GetData = async () => {
    const Data = await AsyncStorage.getItem(strings.prefrenceData.token);
    console.log("Data Token : ", Data);
    setTimeout(() => {
      if (Data == null) {
        navigation.replace(NAVIGATION.landing);
      } else {
        navigation.replace(NAVIGATION.home);
      }
    }, 2000)

  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <LinearGradient_primary style={{ flex: 1 }}>
      <View style={{ height: '15%' }} />
      <View style={{ height: '70%', backgroundColor: '' }}>
        <Image
          source={PartnerTextImage}
          resizeMode="center"
          style={[CommonStyle.absoluteView, { width: '100%', height: '100%' }]}
        />
        <Image
          resizeMode="contain"
          source={IntroEllipseBG}
          style={[{ width: '100%', height: '100%' }]}
        />
      </View>
      {/* <View
        style={{
          height: '15%',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <Button
          title={'Next'}
          customTextColor={{ color: COLOR.PRIMARY }}
          onPress={() => {
            navigation.replace(NAVIGATION.landing);
          }}
        /> */}
      {/* </View> */}
    </LinearGradient_primary>
  );
}

const styles = StyleSheet.create({});
