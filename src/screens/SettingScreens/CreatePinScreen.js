import { AppIcon } from '@/assets';
import { Button } from '@/components';
import OTPInpute from '@/components/OTPInput';
import ScreenName from '@/components/ScreenName';
import Title from '@/components/Title';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

function CreatePinScreen(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ paddingTop: 16 }}>
        <ScreenName onBackPress={() => navigation.goBack()} />
      </View>
      <KeyboardAwareScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={[styles.align_item_center]}>
          <Image
            source={AppIcon}
            style={styles.appIcon_style}
            resizeMode="contain"
          />
          <View style={[styles.align_item_center, { width: '100%' }]}>
            <Title
              title={strings.create_pin_screen.title}
              touchableStyle={styles.touchableStyle}
            />
            <Title
              title={strings.create_pin_screen.subtitle}
              style={styles.subtitle_text}
            />
            <View style={{ width: '100%' }}>
              <OTPInpute cellCount={4} />
            </View>
          </View>
          <View style={styles.button_containerView}>
            <Button
              title={strings.create_pin_screen.button}
              flag={true}
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appIcon_style: {
    height: 75,
    width: 75,
    tintColor: COLOR.PRIMARY,
    marginTop: 4,
  },
  align_item_center: {
    alignItems: 'center',
  },
  subtitle_text: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
    marginTop: 12,
  },
  touchableStyle: {
    marginTop: 60,
  },
  button_containerView: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
  },
});
export default CreatePinScreen;
