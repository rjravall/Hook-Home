import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { COLOR } from '@/theme/theme';
import { IntroEllipseBG, PartnerTextImage } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';

export default function Introduction() {
  const navigation = useNavigation();

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
      <View
        style={{
          height: '15%',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <Button
          title={'Next'}
          customTextColor={{ color: COLOR.PRIMARY }}
          onPress={() => {
            navigation.navigate(NAVIGATION.landing);
          }}
        />
      </View>
    </LinearGradient_primary>
  );
}

const styles = StyleSheet.create({});
