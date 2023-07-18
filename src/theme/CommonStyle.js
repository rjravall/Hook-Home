import { Platform, StyleSheet } from 'react-native';

const CommonStyle = StyleSheet.create({
  absoluteView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  bottomNav: {
    height: 40,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2000,
    bottom: Platform.OS == 'android' ? 0 : 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    marginBottom: 4,
    // alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: 'space-evenly',
  },
  clearBack: {
    backgroundColor: 'transparent',
  },
  flexContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CommonStyle;
