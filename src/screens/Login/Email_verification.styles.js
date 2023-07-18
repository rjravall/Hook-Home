import { StyleSheet } from 'react-native';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { COLOR } from '@/theme/theme';

export const styles = StyleSheet.create({
  title: { padding: 16, backgroundColor: 'white', top: -28 },
  sub_title: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
    marginTop: 8,
  },
  timer_button_container: {
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resend_timer_container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  resend_text: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
  },
  timer_text: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.BLACK90,
  },
});
