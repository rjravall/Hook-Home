import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Title from '@/components/Title';
import TextInputField from '@/components/TextInputField';
import { TextInput } from 'react-native-paper';
import {
  AppleIcon,
  GoogleIcon,
  PwIcon,
} from '@/assets';
import { COLOR } from '@/theme/theme';
import { Button } from '@/components';
import WhiteButton from '@/components/WhiteButton';
import { Login_styles } from './Login.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Top_Logo_Background from '@/components/Top_Logo_Background';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization/index';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import { REGEX } from '@/constants/Regex';
import { sendOtp, loginUser } from '@/api';
import ProgressView from '@/components/ProgressView';
import { setToken, setUserEmail, setUserPassword } from '@/Utils/PrefrenceData';
import { NAV_SIGNUP } from '@/constants/navigation';
// import {shadow} from '@/theme';

export function Login({ route }) {
  const { login } = route.params;
  const { colors } = useTheme();
  const styles = Login_styles(colors);
  const navigation = useNavigation();

  function getFlag(login) {
    return login ? strings.login.title : strings.signup.title;
  }
  const [data, setData] = useState(getFlag(login));
  const [flag, setFlag] = useState(login);
  const [showPassWord, setShowPassword] = useState(true);
  const [showCnfPassWord, setShowCnfPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  function onLogin() {
    // navigation.navigate(NAVIGATION.set_locaion_screen)
    //  navigation.navigate(NAV_SIGNUP.information)
    if (!email) {
      SHOW_TOAST(strings.toast_success_message.enter_email)
    } else if (REGEX.emailRegex.test(email) == false) {
      SHOW_TOAST(strings.toast_success_message.enter_valid_email)
    } else if (!password) {
      SHOW_TOAST(strings.toast_success_message.enter_password)
    }
    // else if (REGEX.passwordRegex.test(password) == false) {
    //   SHOW_TOAST(strings.toast_success_message.enter_valid_password)
    // } 
    else {
      loginRegister()
    }
  }

  function onSendOtp() {
    if (!email) {
      SHOW_TOAST(strings.toast_success_message.enter_email)
    } else if (REGEX.emailRegex.test(email) == false) {
      SHOW_TOAST(strings.toast_success_message.enter_valid_email)
    } else if (!password) {
      SHOW_TOAST(strings.toast_success_message.enter_password)
    }
    // else if (REGEX.passwordRegex.test(password) == false) {
    //   SHOW_TOAST(strings.toast_success_message.enter_valid_password)
    // } 
    else if (!confirmPassword) {
      SHOW_TOAST(strings.toast_success_message.enter_confirmPassword)
    } else if (confirmPassword != password) {
      SHOW_TOAST(strings.toast_success_message.enter_passwordmishmatch)
    } else {
      sendOtpUser()
    }
  }

  async function loginRegister() {
    const params = {
      email: email,
      password: password,
    }

    setIsLoading(true)
    const result = await loginUser(params)
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        setToken(`Bearer ${result?.data?.data.Token}`)
        SHOW_SUCCESS_TOAST(result?.data?.message)
        setUserEmail(email)
        setUserPassword(password)
        setEmail('')
        setPassword('')
        navigation.navigate(NAVIGATION.set_locaion_screen)

        // if (!result?.data?.data.ProfileSetup) {
        //   navigation.navigate(NAV_SIGNUP.information)
        // } else {
        //   navigation.navigate(NAVIGATION.set_locaion_screen)
        // }

      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }

  async function sendOtpUser() {
    const params = {
      email: email,
      registration: false,
    }
    setIsLoading(true)
    const result = await sendOtp(params)
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        SHOW_SUCCESS_TOAST(result.data.message)
        navigation.navigate(NAVIGATION.email, { password: password, email: email })
        setEmail('')
        setPassword('')
        setConfirmpassword('')
      }
      else {
        SHOW_TOAST(result?.data?.message)
      }
    }
    else {
      SHOW_TOAST(result.error)
    }

  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      contentInsetAdjustmentBehavior="automatic">
      <Top_Logo_Background />
      <View style={styles.title}>
        <Title title={data} />
        <Title
          title={
            data == strings.login.title
              ? strings.login.subtitle
              : strings.signup.subtitle
          }
          style={styles.sub_title}
        />

        <TextInputField
          text={email}
          setText={setEmail}
          extraStyle={styles.extraStyle}
          placeholder={strings.common.email}

        />
        <TextInputField
          text={password}
          setText={setPassword}
          extraStyle={styles.extraStyle}
          secureTextEntry={showPassWord}
          placeholder={strings.common.password}
          right={
            <TextInput.Icon
              icon={PwIcon}
              onPress={() => setShowPassword(!showPassWord)}
            />
          }
        />
        {data == strings.login.title && (
          <Text
            onPress={() => navigation.navigate(NAVIGATION.forgotpw)}
            style={styles.forgot_pw}>
            {strings.common.forgot_password}
          </Text>
        )}

        {data !== strings.login.title && (
          <TextInputField
            text={confirmPassword}
            setText={setConfirmpassword}
            secureTextEntry={showCnfPassWord}
            extraStyle={[styles.extraStyle]}
            placeholder={strings.common.cnf_password}
            right={
              <TextInput.Icon
                icon={PwIcon}
                onPress={() => setShowCnfPassword(!showCnfPassWord)}
              />
            }
          />
        )}
        <Button
          title={data}
          style={styles.common_button_style}
          flag={true}
          onPress={() =>
            flag
              ? onLogin()
              : onSendOtp()
          }
        />

        <View style={styles.breaker_OR_container}>
          <View style={styles.breaker_horizontal_line} />
          <Text style={styles.breaker_OR_text}>{strings.common.or_txt}</Text>
          <View style={styles.breaker_horizontal_line} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <WhiteButton
            title={strings.common.google}
            textstyle={{ color: COLOR.BLACK90 }}
            icon={GoogleIcon}
            viewStyle={styles.common_button_style}
          />
          <View style={{ width: 8 }} />
          <WhiteButton
            title={strings.common.apple}
            textstyle={{ color: COLOR.BLACK90 }}
            icon={AppleIcon}
            viewStyle={styles.common_button_style}
          />
        </View>

        <View style={styles.additional_text_container}>
          <Text style={styles.account_conformation}>
            {strings.common.account_conformation}
          </Text>
          <Text
            onPress={() => {
              setData(getFlag(!flag)), setFlag(!flag);
            }}
            style={[
              styles.account_conformation,
              {
                marginHorizontal: 8,
                color: colors.primary,
              },
            ]}>
            {getFlag(!flag)}
          </Text>
        </View>
      </View>
      {isLoading && <ProgressView />}
    </KeyboardAwareScrollView>
  );
}
