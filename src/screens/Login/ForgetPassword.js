import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Top_Logo_Background from '@/components/Top_Logo_Background'
import Title from '@/components/Title';
import { StatusBar, TextField } from 'native-base';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { COLOR } from '@/theme/theme';
import TextInputField from '@/components/TextInputField';
import { Button } from '@/components';
import { TextInput } from 'react-native-paper';
import {
    AppleIcon,
    GoogleIcon,
    PwIcon,
    HidePasswordIcon
} from '@/assets';
import { NAVIGATION } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { setForgetPassword } from '@/api/user';


const ForgetPassword = (props) => {
    const [email, setEmail] = useState(props.route.params.EMAIL);
    const [showPassWord, setShowPassword] = useState(true);
    const [nwePassword, setNewPassword] = useState('');
    const [cnfpassword, setcnfPassword] = useState('');
    const [showCnfPassWord, setShowCnfPassword] = useState(true);
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)

    async function onRegistration() {

        if (!props.route.params.Condition) {
            const params = {

                email: email,
                password: nwePassword
            }
            setIsLoading(true)
            const result = await setForgetPassword(params)
            setIsLoading(false)
            if (result.status) {
                navigation.navigate(NAVIGATION.login)
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
            <StatusBar headerShown={false} />
            <View style={styles.title}>
                <Title title={'Reset Password'} />
                <Title
                    title={'Reset your password and continue with us'}
                    style={styles.sub_title}
                />
                <TextInputField
                    text={nwePassword}
                    setText={setNewPassword}
                    secureTextEntry={showPassWord}
                    extraStyle={styles.extraStyle}
                    placeholder="Enter New Password"
                    right={
                        showPassWord == false ?
                            <TextInput.Icon
                                icon={PwIcon}
                                onPress={() => setShowPassword(!showPassWord)}
                            /> :

                            <TextInput.Icon
                                icon={HidePasswordIcon}
                                onPress={() => setShowPassword(!showPassWord)}
                            />
                    }
                />
                <TextInputField
                    text={cnfpassword}
                    setText={setcnfPassword}
                    extraStyle={styles.extraStyle}
                    secureTextEntry={showCnfPassWord}
                    placeholder="Re-Enter Password"
                    right={
                        showCnfPassWord == false ?
                            <TextInput.Icon
                                icon={PwIcon}
                                onPress={() => setShowCnfPassword(!showCnfPassWord)}
                            /> :
                            <TextInput.Icon
                                icon={HidePasswordIcon}
                                onPress={() => setShowCnfPassword(!showCnfPassWord)}
                            />
                    }
                />
                <Button
                    flag={true}
                    style={{ marginTop: 40 }}
                    title={'Login'}
                    onPress={() => { onRegistration() }}

                />
            </View>
        </KeyboardAwareScrollView>

    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    title: {
        padding: 16,
        backgroundColor: 'white',
        top: -28
    },
    sub_title: {
        fontSize: fontSize.xmedium,
        fontFamily: fontFamily.Medium,
        color: COLOR.GRAY_800,
        marginTop: 8,
    },
    extraStyle: {
        marginTop: 16,
    },
})