import { SelectTickIcon, SMSIcon } from '@/assets';
import { Button } from '@/components';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import ScreenName from '@/components/ScreenName';
import TextInputField from '@/components/TextInputField';
import Title from '@/components/Title';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

function TwoStepVerification({ route, navigation }) {
  const { onBackPress } = route.params;
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <View style={{ paddingTop: 16 }}>
          <ScreenName onBackPress={onBackPress} />
        </View>

        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            <LinearGradient_primary style={styles.icon_style}>
              <Image
                style={{ tintColor: 'white', width: 50, height: 50 }}
                source={SMSIcon}
                resizeMode="contain"
              />
            </LinearGradient_primary>
          </View>
          <View style={styles.title_container}>
            <Title
              title={strings.two_step_verification.title}
              style={styles.title_style}
            />
            <Text style={styles.subtitle_style}>
              {strings.two_step_verification.subtitle}
            </Text>
          </View>
          <TextInputField placeholder={strings.two_step_verification.email} />
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button
              title={strings.two_step_verification.button}
              flag={true}
              style={{ marginTop: 40 }}
              onPress={() =>
                navigation.navigate(NAVIGATION.verification_screen, {
                  // onBackPress: () => alert('hello'),
                  onButtonPress: () =>
                    navigation.replace(NAVIGATION.setting_screen),
                  icon: SelectTickIcon,
                  title: strings.two_step_verification_complete_screen.title,
                  subtitle:
                    strings.two_step_verification_complete_screen.subtitle,
                  button_title:
                    strings.two_step_verification_complete_screen.button_title,
                  flag: false,
                })
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  title_style: {
    fontFamily: fontFamily.Medium,
    fontSize: fontSize.xlarge,
  },
  subtitle_style: {
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.xmedium,
    color: COLOR.GRAY_800,
    marginTop: 12,
    textAlign: 'center',
  },
  title_container: {
    marginTop: 24,
    alignItems: 'center',
  },
  icon_style: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TwoStepVerification;
