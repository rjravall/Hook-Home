import {
  Image,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import React from 'react';
import { AppIcon } from '@/assets';
import { styles } from '@/screens/Landing/Landing.style';
import { Button } from '@/components';
import CommonStyle from '@/theme/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '@/constants/navigation';
import { strings } from '@/localization/index';
import LinearGradient_primary from '@/components/LinearGradient_primary';

export default function Landing() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'rgba(52, 52, 52, 0.4)'}
      />
      <View style={[CommonStyle.absoluteView]}>
        <ImageBackground
          source={require('../../assets/landing_bg/landing_bg.png')}
          resizeMode="cover"
          style={styles.landing_bg_container}></ImageBackground>
        <LinearGradient_primary style={styles.linearGradient} />
        <LinearGradient_primary
          colors={['transparent', 'black']}
          style={[styles.linearGradient, { opacity: 1.0 }]}
          angle={180.07}
          useAngle={true}
        />
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Image
          source={AppIcon}
          style={{
            width: 100,
            height: 150,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: 'transparent',
        }}>
        {/* <Button
          title={'Home'}
          style={{marginBottom: 40, marginTop: 16}}
          onPress={() => navigation.navigate(NAVIGATION.home, {login: true})}
        /> */}

        <Button
          title={strings.landing.login}
          onPress={() => navigation.replace(NAVIGATION.login, { login: true })}
        />

        <Button
          title={strings.landing.logout}
          flag={true}
          shadow={false}
          style={{ marginBottom: 40, marginTop: 16 }}
          onPress={() => navigation.replace(NAVIGATION.login, { login: false })}
        />
      </View>
    </View>
  );
}
