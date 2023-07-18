import {
  View,
  Image,
  FlatList,
  Text,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { Checkbox, Input, Slide } from 'native-base';
import { SearchIcon } from '@/assets';
import OptionQuestionnair from '@/components/OptionQuestionnair';
import RangeSlider from '@/components/RangeSlider';
import CustomSwitch from '@/components/Switch';
import Title from '@/components/Title';
import WhiteButton from '@/components/WhiteButton';

import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize, width } from '@/Utils/Constant';
import { QuestionnaireData } from '../SignUp/Information/QuestionnaireData';

import { useState } from 'react';
import Divider from '@/components/Divider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { strings } from '@/localization';

export default function HomeFilterView({ setDataFilterVisible }) {
  let [check, setCheck] = useState(true);
  const AGE_MIN = 18;
  const AGE_MAX = 100;
  const DISTANCE_MAX = 100;
  const [ageMinValue, setAgeMinValue] = useState(18);
  const [ageMaxValue, setAgeMaxValue] = useState(35);
  const [distance, setDistance] = useState(25);
  const styles = StyleSheet.create({
    search_icon: {
      height: 16,
      width: 16,
      marginLeft: 16,
    },
    filter_view_container: {
      padding: 16,
      backgroundColor: 'white',
      borderTopEndRadius: 35,
      borderTopStartRadius: 35,
    },
    slider_title_container: {
      flexDirection: 'row',
    },
    title_slider: {
      color: COLOR.GRAY_800,
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Medium,
    },
    value_slider: {
      textAlign: 'right',
      flex: 1,
      color: COLOR.PRIMARY,
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Medium,
    },
    slider: { marginTop: 26, marginBottom: 16 },
    has_photo_text: {
      fontFamily: fontFamily.Regular,
      fontSize: fontSize.medium,
      color: COLOR.BLACK80,
    },
    photo_intrest_text: {
      color: COLOR.GRAY_800,
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Medium,
    },
  });
  function renderQuestionnaire(value, index) {
    if (index < 6) return <OptionQuestionnair key={index} text={value} />;
  }

  function hideFilterView() {
    Keyboard.dismiss();
    setDataFilterVisible(false);
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      bounces={true}
      contentInsetAdjustmentBehavior="automatic">
      <Slide
        placement="bottom"
        in={true}
        style={{
          justifyContent: 'flex-end',
        }}>
        <View style={styles.filter_view_container}>
          <View>
            <Title
              style={{ marginTop: 14 }}
              title={strings.data_filter_Screen.title}
            />
            <View style={[styles.slider_title_container, { marginTop: 24 }]}>
              <Title
                title={strings.data_filter_Screen.maximum_distance}
                style={styles.title_slider}
              />
              <Text style={styles.value_slider}>
                {distance} {strings.data_filter_Screen.miter}
              </Text>
            </View>

            <RangeSlider
              containerStyle={styles.slider}
              sliderWidth={width - 50}
              max={DISTANCE_MAX}
              step={1}
              value={distance}
              onValueChange={range => {
                setDistance(range.max);
              }}
            />
          </View>
          <Divider divider_style={{ marginVertical: 16 }} />

          <View style={styles.slider_title_container}>
            <Title
              title={strings.data_filter_Screen.age_range}
              style={styles.title_slider}
            />
            <Text style={styles.value_slider}>
              {ageMinValue}-{ageMaxValue}
            </Text>
          </View>

          <RangeSlider
            containerStyle={styles.slider}
            sliderWidth={width - 50}
            min={AGE_MIN}
            max={AGE_MAX}
            step={1}
            onValueChange={range => {
              setAgeMinValue(range.min);
              setAgeMaxValue(range.max);
            }}
          />
          <Divider divider_style={{ marginVertical: 16 }} />

          <View
            style={[
              styles.slider_title_container,
              {
                alignItems: 'center',
              },
            ]}>
            <View
              style={{
                flex: 1,
              }}>
              <Title
                style={styles.has_photo_text}
                title={strings.data_filter_Screen.has_photo}
              />
            </View>

            <CustomSwitch
              containerStyle={{
                flex: 1,
                alignItems: 'flex-end',
              }}
              onChange={() => { }}
            />
          </View>

          <Divider divider_style={{ marginVertical: 16 }} />

          <Title
            title={strings.data_filter_Screen.intrest}
            style={styles.photo_intrest_text}
          />
          <Input
            marginTop={4}
            style={{ height: 44 }}
            variant="rounded"
            focusOutlineColor={COLOR.GRAY_400}
            backgroundColor={COLOR.GRAY_200}
            placeholderTextColor={COLOR.GRAY_800}
            placeholder={strings.data_filter_Screen.search}
            fontSize={fontSize.xmedium}
            InputLeftElement={
              <Image source={SearchIcon} style={styles.search_icon} />
            }
          />

          <View>
            <FlatList
              data={QuestionnaireData[2].types}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  style={[
                    styles.slider_title_container,
                    {
                      flexWrap: 'wrap',
                      height: 100,
                    },
                  ]}>
                  {QuestionnaireData[2][item].options.map((value, index) =>
                    renderQuestionnaire(value, index),
                  )}
                </View>
              )}
            />
          </View>
          <Divider divider_style={{ marginVertical: 16 }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Checkbox
              colorScheme={'red'}
              accessibilityLabel={strings.data_filter_Screen.photo_verified}
              onChange={check => { }}
            />

            <Title
              title={strings.data_filter_Screen.photo_verified}
              style={[styles.photo_intrest_text, { marginStart: 8 }]}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <WhiteButton
              title={strings.data_filter_Screen.clear}
              onPress={() => hideFilterView()}
              viewStyle={{ flex: 1 }}
            />
            <View style={{ width: 8 }} />
            <WhiteButton
              viewStyle={{ flex: 1 }}
              title={strings.data_filter_Screen.apply}
              flag={true}
              onPress={() => {
                hideFilterView();
              }}
            />
          </View>
        </View>
      </Slide>
    </KeyboardAwareScrollView>
  );
}
