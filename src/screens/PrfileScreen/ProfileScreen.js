import {
  ProfileBackGround,
  EditIcon,
  GreenTickIcon,
  SettingIcon,
  StarIcon,
} from '@/assets';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import OptionWithIcon from '@/components/OptionWithIcon';

import Title from '@/components/Title';
import { NAVIGATION } from '@/constants';
import CommonStyle from '@/theme/CommonStyle';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Slide } from 'native-base';
import { Circle } from 'react-native-svg';

import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Rating } from 'react-native-ratings';
import { strings } from '@/localization';

function ProfileScreen({ route }) {
  const navigation = useNavigation();



  const [showRating, setShowRating] = useState(false);
  function switchScreen(index) {
    switch (index) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        return navigation.navigate(NAVIGATION.FAQ_screen);
      case 3:
        return setShowRating(visible => {
          route.params.setShowTabBar(visible);
          return !visible;
        });
      case 4:
        return navigation.navigate(NAVIGATION.ReportApp_screen);
      case 6:
        return route.params.setLogout();
      // return alert(index);
    }
  }

  return (
    <NativeBaseProvider>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ top: -74 }}>
          <LinearGradient_primary style={styles.background_profile_container}>
            <Image
              source={ProfileBackGround}
              resizeMode="contain"
              style={styles.profile_background}
            />
          </LinearGradient_primary>
          <View style={{ top: -75 }}>
            <View style={styles.center_option_container}>
              <View
                style={[
                  styles.fix_flex,
                  {
                    alignItems: 'flex-end',
                  },
                ]}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate(NAVIGATION.setting_screen_stack);
                  }}>
                  <View style={styles.roundShape}>
                    <Image
                      source={SettingIcon}
                      style={styles.image_size}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View
                style={[
                  styles.fix_flex,
                  {
                    marginHorizontal: 45,
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={[
                    styles.roundShape,
                    {
                      height: 150,
                      width: 150,
                      borderRadius: 75,
                      backgroundColor: 'white',
                    },
                  ]}>
                  <View
                    style={[
                      CommonStyle.absoluteView,
                      {
                        top: 7,
                        left: -39,
                        height: 200,
                        width: 200,
                      },
                    ]}>
                    <AnimatedCircularProgress
                      size={152}
                      width={4}
                      fill={80}
                      tintColor={COLOR.PRIMARY}
                      padding={10}
                      style={{ transform: [{ rotate: '130deg' }] }}
                      renderCap={({ center }) => (
                        <Circle
                          cx={center.x}
                          cy={center.y}
                          r="4"
                          fill={COLOR.PRIMARY}
                        />
                      )}
                      arcSweepAngle={270}
                    />
                  </View>
                  <Image
                    source={require('@/assets/other/person.png')}
                    style={styles.person_image_container}
                    resizeMode="cover"
                  />
                  <View style={styles.process_text_container}>
                    <Title
                      title={strings.profile_screen.profile_compeleted}
                      style={styles.process_text}
                    />
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.fix_flex,
                  {
                    alignItems: 'flex-start',
                  },
                ]}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate(NAVIGATION.edit_profile, {
                      setShowTabBar: flag => {
                        route.params.setShowTabBar(flag);
                      },
                    })
                  }>
                  <View style={styles.roundShape}>
                    <Image
                      source={EditIcon}
                      style={styles.image_size}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.person_name}>
              <Title
                title={strings.profile_screen.person_name}
                style={{ fontSize: 22 }}
              />
              <Image
                source={GreenTickIcon}
                style={styles.green_tick}
                resizeMode="contain"
              />
            </View>
            {strings.profile_screen.ProfileOptions.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
                  <OptionWithIcon
                    onPress={() => switchScreen(index)}
                    key={index}
                    title={Object.values(item)[0]}
                    icon={Object.values(item)[1]}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Slide
        placement="bottom"
        in={showRating}
        style={{ justifyContent: 'flex-end' }}>
        <View style={styles.slider_container}>
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            <LinearGradient_primary
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{ tintColor: 'white', width: 22, height: 22 }}
                source={StarIcon}
                resizeMode="contain"
              />
            </LinearGradient_primary>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Title
              title={strings.rating_slider.title}
              style={styles.title_style}
            />
            <Text style={styles.subtitle_rating}>
              {strings.rating_slider.subtitle}
            </Text>
          </View>

          <Rating
            style={{ marginVertical: 45 }}
            type="star"
            ratingCount={5}
            imageSize={28}
            onFinishRating={() =>
              setShowRating(visible => {
                route.params.setShowTabBar(visible);
                return !visible;
              })
            }
          />
          <Text
            onPress={() =>
              setShowRating(visible => {
                route.params.setShowTabBar(visible);
                return !visible;
              })
            }
            style={styles.subtitle_rating}>
            {strings.rating_slider.not_now}
          </Text>
        </View>
      </Slide>
      {showRating && (
        <TouchableOpacity
          style={[
            CommonStyle.absoluteView,
            { backgroundColor: 'black', flex: 1, opacity: 0.6 },
          ]}
          onPress={() =>
            setShowRating(visible => {
              route.params.setShowTabBar(visible);
              return !visible;
            })
          }
        />
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  slider_container: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  green_tick: { height: 20, width: 20, marginStart: 8 },
  roundShape: {
    height: 48,
    width: 48,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLOR.WHITE_20,
    elevation: 20,
    shadowColor: 'A0929A',
    shadowOpacity: 0.25,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 20 },
  },
  image_size: { height: 24, width: 24 },
  fix_flex: {
    flex: 1,
    justifyContent: 'center',
  },
  process_text_container: {
    position: 'absolute',
    bottom: -2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
    borderRadius: 28,
  },
  process_text: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Regular,
    color: COLOR.PRIMARY,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  person_name: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_style: {
    marginTop: 25,
  },
  subtitle_rating: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
  },
  not_now_rating: {
    fontSize: fontSize.medium,
    color: COLOR.GRAY_800,
  },
  profile_background: {
    flex: 1,
    opacity: 0.3,
    borderRadius: 50,
  },
  background_profile_container: {
    borderRadius: 35,
    height: 316,
    alignItems: 'center',
  },
  center_option_container: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  person_image_container: { height: 126, width: 126, borderRadius: 63 },
});
export default ProfileScreen;
