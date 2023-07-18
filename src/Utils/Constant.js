import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const { height, width } = Dimensions.get('window');

export const fontFamily = {
  Regular: 'Outfit-Regular',
  Light: 'Outfit-Light',
  Medium: 'Outfit-Medium',
  SemiBold: 'Outfit-SemiBold',
};

// Font Sizes
export const fontSize = {
  xsmall: 10,
  small: 12,
  xmedium: 14,
  medium: 16,
  large: 18,
  semilarge: 20,
  xlarge: 24,
};
