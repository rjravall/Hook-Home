import { postChangePassword } from '@/api';
import { PwIcon } from '@/assets';
import { Button } from '@/components';
import ScreenName from '@/components/ScreenName';
import TextInputField from '@/components/TextInputField';
import { REGEX } from '@/constants/Regex';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import { strings } from '@/localization';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';

function ChangePassword(props) {
  const [showOldPassWord, setShowOldPassword] = useState(true);
  const [showNewPassWord, setShowNewPassword] = useState(true);
  const [showCnfNewPassWord, setShowCnfNewPassword] = useState(true);
  const navigation = useNavigation();
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  function onChangePasswordValidation() {
    if (!oldpassword) {
      SHOW_TOAST(strings.toast_success_message.enter_password)
    } else if (REGEX.emailRegex.test(oldpassword) == false) {
      SHOW_TOAST(strings.toast_success_message.enter_valid_password)
    } else if (!newpassword) {
      SHOW_TOAST(strings.toast_success_message.enter_password)
    }
    // else if (REGEX.passwordRegex.test(newpassword) == false) {
    //   SHOW_TOAST(strings.toast_success_message.enter_valid_password)
    // }
    else if (!confirmPassword) {
      SHOW_TOAST(strings.toast_success_message.enter_confirmPassword)
    } else if (confirmPassword != password) {
      SHOW_TOAST(strings.toast_success_message.enter_passwordmishmatch)
    } else {
      onChangePassword()
    }
  }

  async function onChangePassword() {
    const params = {
      oldPassword: oldpassword,
      newPassword: newpassword,
    }

    setIsLoading(true)
    const result = await postChangePassword(params)
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.status) {
        SHOW_SUCCESS_TOAST(result?.data?.message)
        navigation.goBack()
      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white', marginTop: StatusBar.currentHeight + 4 }}
      contentInsetAdjustmentBehavior="automatic">
      <View style={{ paddingTop: 16 }}>
        <ScreenName
          name={strings.change_password_screen.title}
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View>
          <TextInputField
            text={oldpassword}
            setText={setOldPassword}
            placeholder={strings.change_password_screen.old_pw}
            secureTextEntry={showOldPassWord}
            extraStyle={{ marginTop: 32 }}
            right={
              <TextInput.Icon
                icon={PwIcon}
                onPress={() => setShowOldPassword(!showOldPassWord)}
              />
            }
          />
          <TextInputField
            text={newpassword}
            setText={setNewPassword}
            placeholder={strings.change_password_screen.new_pw}
            secureTextEntry={showNewPassWord}
            extraStyle={{ marginTop: 32 }}
            right={
              <TextInput.Icon
                icon={PwIcon}
                onPress={() => setShowNewPassword(!showNewPassWord)}
              />
            }
          />
          <TextInputField
            text={confirmPassword}
            setText={setConfirmpassword}
            placeholder={strings.change_password_screen.confirm_pw}
            secureTextEntry={showCnfNewPassWord}
            extraStyle={{ marginTop: 32 }}
            right={
              <TextInput.Icon
                icon={PwIcon}
                onPress={() => setShowCnfNewPassword(!showCnfNewPassWord)}
              />
            }
          />
          <Button
            title={strings.change_password_screen.button}
            style={{ marginTop: 32 }}
            flag={true}
            onPress={() => {
              onChangePasswordValidation()
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ChangePassword;
