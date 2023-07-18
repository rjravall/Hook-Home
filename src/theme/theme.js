import { DarkTheme, DefaultTheme } from '@react-navigation/native';
export const COLOR = {
  BLACK90: '#241B20',
  BLACK80: '#313A45',

  GRAY_BORDER: '#CDC8CB',
  GRAY_800: '#9B9197',
  GRAY_700: '#636262',
  GRAY_500: '#D6D6D6',
  GRAY_400: '#D4D4D4',
  GRAY_200: '#F0F0F0',
  PINK_LIGHT: '#F9DEED',
  CHAT_BUBBLE_PINK_LIGHT: '#F8E7F0',
  PRIMARY: '#E6256F',
  SECONDAY_FOR_SHADOW: '#E94D56',
  WHITE_10: '#F2F2F2',
  WHITE_20: '#EBEBEB',
  WHITE_30: '#E1E1E1',
  WHITE: "#FFFFFF"
};

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#E6256F',
      secondary: '#29434E',
      error: '#D32F2F',
      text: '#241B20',
      border: '#212121',
      activeTab: '#1976D2',
      inactiveTab: '#757575',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#E6256F',
      secondary: '#29434E',
      error: '#D32F2F',
      text: '#241B20',
      border: '#212121',
      activeTab: '#1976D2',
      inactiveTab: '#757575',
    },
  },
};
