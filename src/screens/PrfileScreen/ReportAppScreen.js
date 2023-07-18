import ScreenName from '@/components/ScreenName';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize, isIOS } from '@/Utils/Constant';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import TextInputField from '@/components/TextInputField';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { strings } from '@/localization';

function ReportAppScreen({ route }) {
  useEffect(() => {
    setTimeout(
      () => {
        route.params.setShowTabBar(false);
      },
      isIOS ? 600 : 0,
    );
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const [active, setActive] = useState(false);
  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={{ color: COLOR.GRAY_800 }}>{item.label}</Text>
        {/* <Image style={styles.icon} source={EditIcon} /> */}
      </View>
    );
  };

  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white', marginTop: StatusBar.currentHeight + 4 }}
      bounces={true}
      contentInsetAdjustmentBehavior="automatic">
      <ScreenName
        name={strings.report_screen.title}
        onBackPress={() => navigation.goBack()}
      />
      <View
        style={{
          marginHorizontal: 16,
          paddingBottom: 50,
        }}>
        <Text style={{ marginTop: 32, color: COLOR.GRAY_800 }}>
          {strings.report_screen.select_options_title}
        </Text>

        <Dropdown
          // activeColor={COLOR.PRIMARY}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          selectedTextStyle={{
            color: COLOR.BLACK80,
            fontFamily: fontFamily.Regular,
          }}
          style={{
            borderBottomColor: active ? COLOR.PRIMARY : COLOR.GRAY_800,
            borderBottomWidth: 1,
            marginTop: 24,
          }}
          itemContainerStyle={{
            marginVertical: 8,
            marginHorizontal: 4,
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLOR.GRAY_800,
          }}
          data={data}
          search
          searchPlaceholder={strings.report_screen.search}
          labelField="label"
          valueField="value"
          inputSearchStyle={{ color: COLOR.GRAY_800 }}
          placeholder={strings.report_screen.placeholder_type}
          value={dropdown}
          placeholderStyle={{ color: COLOR.GRAY_800 }}
          onChange={item => {
            setDropdown(item.value);
          }}
          renderItem={item => _renderItem(item)}
          textError="Error"
        />

        <View style={{ marginTop: 8 }}>
          <TextInputField
            extraStyle={{ marginTop: 32 }}
            placeholder={strings.report_screen.placeholder_msg}
            multiline={true}
            numberOfLines={5}
            textAlign="center"
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 16,
            justifyContent: 'flex-end',
          }}>
          <Button flag={true} title={strings.report_screen.button} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  lable: {
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.small,
    color: COLOR.BLACK80,
    marginTop: 32,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
});
export default ReportAppScreen;
