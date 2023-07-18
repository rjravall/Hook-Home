import { isIOS } from '@/Utils/Constant';
import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LikedIcon, MatchedBg, personIcon } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import { Button } from '@/components';
import { COLOR } from '@/theme/theme';
import ScreenName from '@/components/ScreenName';
import { useNavigation } from '@react-navigation/native';

function Matched({ route }) {
  useEffect(() => {
    setTimeout(
      () => {
        route.params.setShowTabBar(false);
      },
      isIOS ? 600 : 0,
    );
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);
  const navigation = useNavigation();
  return (
    <LinearGradient_primary style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <ScreenName
          onBackPress={() => navigation.goBack()}
          imagestyle={{ tintColor: 'white' }}
        />
        <Image
          source={MatchedBg}
          style={{ height: '50%', resizeMode: 'cover', zIndex: 1 }}
        />

        <View style={[CommonStyle.absoluteView, styles.center_image_container]}>
          <View style={[styles.single_image_container, { left: 10 }]}>
            <Image source={personIcon} style={styles.image} />
          </View>
          <View
            style={[
              styles.single_image_container,
              { transform: [{ rotateZ: '15deg' }], right: 5 },
            ]}>
            <Image source={personIcon} style={styles.image} />
          </View>
        </View>
        <View style={styles.liked_icon}>
          <Image
            source={LikedIcon}
            resizeMode={'contain'}
            style={{ height: 22, width: 22 }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'Start Date'}
            customTextColor={{ color: COLOR.PRIMARY }}
            onPress={() => { }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient_primary>
  );
}
const styles = StyleSheet.create({
  liked_icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF377F',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: 'white',
    zIndex: 2,
    borderWidth: 3,
    top: 30,
  },
  button: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  center_image_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    top: 100,
    width: '100%',
    justifyContent: 'center',
  },
  single_image_container: {
    elevation: 8,
    shadowColor: 'A0929A',
    shadowOpacity: 0.25,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 20 },
    height: 190,
    width: 130,
    transform: [{ rotateZ: '-18deg' }],
  },
  image: {
    height: 190,
    width: 130,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'white',
  },
});
export default Matched;
