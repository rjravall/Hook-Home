import { Button } from '@/components';
import OTPInpute from '@/components/OTPInput';
import Title from '@/components/Title';
import Top_Logo_Background from '@/components/Top_Logo_Background';
import { NAV_SIGNUP } from '@/constants/navigation';
import { strings } from '@/localization';
import { useNavigation } from '@react-navigation/native';

import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { signUp } from '@/api';
import ProgressView from '@/components/ProgressView';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import { styles } from './Email_verification.styles';
import { setToken, setUserEmail, setUserPassword } from '@/Utils/PrefrenceData';

function Email_Verification(props) {

  const [timer, setTimer] = useState(59);
  const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOTP] = useState('');

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  let navigation = useNavigation();

  function onValidationRegistration() {
    if (otp.length < 6) {
      SHOW_TOAST(strings.toast_success_message.enter_six_digit_code)
    } else {
      onRegistration()
    }
  }

  async function onRegistration() {
    const params = {
      email: props.route.params.email,
      password: props.route.params.password,
      otp: otp
    }
    setIsLoading(true)
    const result = await signUp(params)
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        SHOW_SUCCESS_TOAST(result?.data?.message)
        setToken(`Bearer ${result.data.data.token}`)
        setUserEmail(props.route.params.email)
        setUserPassword(props.route.params.password)
        navigation.navigate(NAV_SIGNUP.information, { index: 0 })
      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }

  // const TimeSet = ()=> {

  //   if (timer == 0) {
  //     <Title title={'00:00'} style={styles.timer_text} />
  //     if (timer < 10) {
  //       <Title timer title={'00:' + "0" + timer} style={styles.timer_text} />
  //     } else {
  //       <Title timer title={'00:' + timer} style={styles.timer_text} />
  //     }
  //   }

  // }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      bounces={true}
      contentInsetAdjustmentBehavior="automatic">
      <Top_Logo_Background />

      <View style={styles.title}>
        <Title title={strings.email_verification.title} />
        <Title
          title={strings.email_verification.subtitle}
          style={styles.sub_title}
        />
      </View>
      <OTPInpute
        value={otp}
        setValue={setOTP}
        cellCount={6} />
      <View style={styles.timer_button_container}>
        <View style={styles.resend_timer_container}>
          <Title
            title={strings.email_verification.resend_code_text}
            style={styles.resend_text}
          />

          {

            timer == 0 ?
              <Title title={'00:00'} style={styles.timer_text} />
              :
              timer >= 10 ?
                <Title timer title={'00:' + timer} style={styles.timer_text} />
                :
                <Title timer title={'00:' + "0" + timer} style={styles.timer_text} />
          }


        </View>



        {
          timer == 0 ?
            <Button
              style={{ marginTop: 32 }}
              onPress={() => onValidationRegistration()}
              title={strings.email_verification.sendotp}
              flag={true}
            /> :
            <Button
              style={{ marginTop: 32 }}
              onPress={() => onValidationRegistration()}
              title={strings.email_verification.button}
              flag={true}
            />
        }

      </View>
      {isLoading && <ProgressView />}
    </KeyboardAwareScrollView>
  );
}

export default Email_Verification;
