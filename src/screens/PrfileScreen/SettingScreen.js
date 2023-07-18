import { PwIcon, SelectTickIcon, TrashIcon } from '@/assets';
import Divider from '@/components/Divider';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import OptionWithIcon from '@/components/OptionWithIcon';
import ScreenName from '@/components/ScreenName';
import Title from '@/components/Title';
import WhiteButton from '@/components/WhiteButton';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import CommonStyle from '@/theme/CommonStyle';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Slide } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';


function SettingScreen({ route }) {
  const navigation = useNavigation();
  const [switch_flag, SetSwitch_flag] = useState(false);
  const [deleteAccount, SetDeleteAccount] = useState(false);
  function onChangeswitch(isOn) {
    SetSwitch_flag(isOn);
  }
  const styles = StyleSheet.create({
    title_style: {
      marginTop: 25,
    },
    subtitle_rating: {
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Medium,
      color: COLOR.GRAY_800,
      textAlign: 'center',
      marginTop: 12,
    },
    not_now_rating: {
      fontSize: fontSize.medium,
      color: COLOR.GRAY_800,
    },
    common_button_style: {
      borderWidth: 1,
      flex: 1,
      borderColor: COLOR.GRAY_500,
    },
    setting_option_container: {
      paddingHorizontal: 16,
      backgroundColor: 'white',
      paddingBottom: 16,
    },
    option_heading: {
      marginTop: 16,
      fontFamily: fontFamily.Medium,
      fontSize: fontSize.xmedium,
      color: COLOR.GRAY_800,
    },
    delete_slider_container: {
      paddingHorizontal: 16,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 50,
      paddingBottom: 24,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    delete_icon_slider_container: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slider_btn_container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 32,
    },
  });
  function switchScreen(screen_name) {
    switch (screen_name) {
      case 'Change Password':
        return navigation.navigate(NAVIGATION.change_pw_screen);
      case 'Change Location':
        return navigation.navigate(NAVIGATION.set_locaion_screen, { setting: true });
      case 'Blocked User':
        return navigation.navigate(NAVIGATION.blocked_user_screen);
      case 'Delete Profile': {
        return SetDeleteAccount(true);
      }
      case 'Pin':
        return navigation.navigate(NAVIGATION.create_pin_Screen);
      case 'Face ID value':
        return navigation.navigate(NAVIGATION.verification_screen, {
          onBackPress: () => navigation.goBack(),

          onButtonPress: () =>
            navigation.navigate(NAVIGATION.verification_screen, {
              // onBackPress: () => alert('hello'),
              onButtonPress: () =>
                navigation.replace(NAVIGATION.setting_screen),
              icon: SelectTickIcon,
              title: strings.face_id_setup_complete_screen.title,
              subtitle: strings.face_id_setup_complete_screen.subtitle,
              button_title: strings.face_id_setup_complete_screen.button_title,
              flag: false,
            }),
          icon: PwIcon,
          title: strings.face_id_value_screen.title,
          subtitle: strings.face_id_value_screen.subtitle,
          button_title: strings.face_id_value_screen.button_title,
          flag: true,
        });
      case 'Privacy Policy':
        return navigation.navigate(NAVIGATION.privacy_policy_screen);
      case 'Terms of Use':
        return navigation.navigate(NAVIGATION.terms_condition_screen);

      case 'Two Factor Authentication':
        return navigation.navigate(NAVIGATION.verification_screen, {
          onBackPress: () => navigation.goBack(),
          onButtonPress: () =>
            navigation.navigate(NAVIGATION.twoStep_Verification_screen, {
              onBackPress: () => navigation.goBack(),
            }),
          icon: PwIcon,
          title: strings.two_factor_screen.title,
          subtitle: strings.two_factor_screen.subtitle,
          button_title: strings.two_factor_screen.button_title,
          flag: true,
        });
    }
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          paddingBottom: 40,
          marginTop: StatusBar.currentHeight + 4,
        }}>
        <ScreenName
          name={strings.setting_screen.title}
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
              }}></View>
            <View>
              {strings.setting_screen.settingScreen_options.map(
                (item, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.setting_option_container,
                        {
                          marginTop: index == 0 ? 0 : 4,
                          paddingTop: index == 0 ? 16 : 0,
                        },
                      ]}>
                      <Title title={item.title} style={styles.option_heading} />

                      {strings.setting_screen.settingScreen_options[index][
                        strings.setting_screen.settingScreen_options[index].type
                      ].map((item, inx) => {
                        return (
                          <View key={inx}>
                            <View style={{ paddingVertical: 12 }}>
                              <OptionWithIcon
                                onPress={() => switchScreen(item.title)}
                                switch_flag={item.switch_flag}
                                title={item.title}
                                value={item.value}
                                onChangeswitch={onChangeswitch}
                              />
                            </View>
                            <Divider />
                          </View>
                        );
                      })}
                    </View>
                  );
                },
              )}
            </View>
          </View>
        </ScrollView>

        {/* Delete Account PopUp */}
        <Slide
          placement="bottom"
          in={deleteAccount}
          style={{ justifyContent: 'flex-end' }}>
          <View style={styles.delete_slider_container}>
            <View style={{ alignItems: 'center', alignSelf: 'center' }}>
              <LinearGradient_primary
                style={styles.delete_icon_slider_container}>
                <Image
                  style={{ tintColor: 'white', width: 22, height: 22 }}
                  source={TrashIcon}
                  resizeMode="contain"
                />
              </LinearGradient_primary>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Title
                title={strings.delete_account_slider.title}
                style={styles.title_style}
              />
              <Text style={styles.subtitle_rating}>
                {strings.delete_account_slider.subtitle}
              </Text>
            </View>

            <View style={styles.slider_btn_container}>
              <WhiteButton
                title={strings.delete_account_slider.cancel_button}
                viewStyle={styles.common_button_style}
                textstyle={{ color: COLOR.GRAY_800 }}
                onPress={() => SetDeleteAccount(false)}
              />
              <View style={{ width: 8 }} />
              <WhiteButton
                title={strings.delete_account_slider.delete_button}
                flag={true}
                viewStyle={{ flex: 1 }}
              />
            </View>
          </View>
        </Slide>
        {deleteAccount && (
          <TouchableOpacity
            style={[
              CommonStyle.absoluteView,
              { backgroundColor: 'black', flex: 1, opacity: 0.6 },
            ]}
            onPress={() => SetDeleteAccount(false)}
          />
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default SettingScreen;
