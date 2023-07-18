import Top_Logo_Background from '@/components/Top_Logo_Background';
import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { COLOR } from '@/theme/theme';
import Title from '@/components/Title';
import TextInputField from '@/components/TextInputField';
import { Button } from '@/components';
import { useNavigation, useTheme } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import ProgressView from '@/components/ProgressView';
import { sendOtp } from '@/api';
import { strings } from '@/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REGEX } from '@/constants/Regex';

function ForgotScreen(props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const [password, setPassword] = useState('');

  function onForgotePassword() {
    if (!email) {
      SHOW_TOAST(strings.toast_success_message.enter_email)
    } else if (REGEX.emailRegex.test(email) == false) {
      SHOW_TOAST(strings.toast_success_message.enter_valid_email)
    } else {
      AsyncStorage.getItem(strings.prefrenceData.userPassword, (err, result) => {
        setPassword(result)
      })
      forgotPassword()
    }
  }

  async function forgotPassword() {

    const params = {
      email: email,
      registration: true,
    }
    setIsLoading(true)
    const result = await sendOtp(params)
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        SHOW_SUCCESS_TOAST(result.data.message)
        navigation.navigate(NAVIGATION.email, { password: password, email: email })
      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      contentInsetAdjustmentBehavior="automatic">
      <Top_Logo_Background />
      <View style={styles.title}>
        <Title title={'Forgot Password'} />
        <Title
          title={'Enter your email address to recive a verification code'}
          style={styles.sub_title}
        />
        <TextInputField
          text={email}
          setText={setEmail}
          extraStyle={styles.extraStyle}
          placeholder="Email" />

        <Button
          flag={true}
          style={{ marginTop: 40 }}
          title={'Send'}
          onPress={() => onForgotePassword()}
        />

        <Text
          style={styles.account_conformation}
          onPress={() => navigation.goBack()}>
          Back to Login
        </Text>
      </View>
      {isLoading && <ProgressView />}

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  title: { padding: 16, backgroundColor: 'white', top: -28 },
  sub_title: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
    marginTop: 8,
  },
  extraStyle: {
    marginTop: 16,
  },
  account_conformation: {
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.xmedium,
    color: COLOR.GRAY_800,
    marginTop: 24,
    color: COLOR.PRIMARY,
    alignSelf: 'center',
  },
});

export default ForgotScreen;
