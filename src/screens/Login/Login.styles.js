import { StyleSheet } from 'react-native';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { COLOR } from '@/theme/theme';

export const Login_styles = colors =>
  StyleSheet.create({
    title: { padding: 16, top: -28, backgroundColor: 'white' },
    sub_title: {
      fontSize: fontSize.xmedium,
      fontFamily: fontFamily.Medium,
      color: COLOR.GRAY_800,
      marginTop: 8,
    },
    forgot_pw: {
      fontSize: fontSize.xmedium,
      alignSelf: 'flex-end',
      fontFamily: fontFamily.Medium,
      color: COLOR.GRAY_800,
      marginTop: 16,
    },
    breaker_OR_container: {
      marginTop: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    breaker_horizontal_line: {
      width: 50,
      borderRadius: 12,
      height: 1,
      backgroundColor: COLOR.GRAY_500,
    },
    breaker_OR_text: {
      fontFamily: fontFamily.Regular,
      marginHorizontal: 8,
      fontSize: fontSize.xmedium,
      color: COLOR.GRAY_800,
    },
    additional_text_container: {
      marginBottom: 44,
      marginTop: 65,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    account_conformation: {
      fontFamily: fontFamily.Regular,
      fontSize: fontSize.xmedium,
      color: COLOR.GRAY_800,
    },
    extraStyle: {
      marginTop: 10,
    },
    common_button_style: {
      marginTop: 32,
      flex: 1,
      borderWidth: 1,
      borderColor: COLOR.GRAY_500,
    },
  });
