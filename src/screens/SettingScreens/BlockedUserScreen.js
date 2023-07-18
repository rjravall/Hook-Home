import { SearchIcon } from '@/assets';
import Divider from '@/components/Divider';
import ScreenName from '@/components/ScreenName';
import UnBlockUserItem from '@/components/UnBlockUserItem';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Input, NativeBaseProvider } from 'native-base';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const blockedUserList = [
  {
    id: 0,
    index: 0,
    name: 'Court Smith',
    greentick: true,
    time: '25 jan, 2022',
  },
  {
    id: 1,
    index: 1,
    name: 'Stuart Anderson',
    time: '21 jan, 2022',
  },
  {
    id: 3,
    index: 0,
    name: 'Ian Cook',
    greentick: false,
    time: '15 jan, 2022',
  },
];
function BlockedUserScreen({ route }) {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <View style={{ paddingTop: 16 }}>
          <ScreenName
            name={strings.blocked_user_screen.title}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ marginTop: 24 }}>
            <Input
              variant="rounded"
              style={{
                height: 44,
                backgroundColor: COLOR.GRAY_500,
              }}
              focusOutlineColor={COLOR.GRAY_400}
              backgroundColor={COLOR.GRAY_200}
              placeholderTextColor={COLOR.GRAY_800}
              placeholder={strings.blocked_user_screen.search}
              fontSize={fontSize.xmedium}
              InputLeftElement={
                <View style={styles.search_img_container}>
                  <Image source={SearchIcon} style={styles.search_image} />
                </View>
              }
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <FlatList
              data={blockedUserList}
              renderItem={({ item, index }) => (
                <View>
                  <UnBlockUserItem
                    name={blockedUserList[index].name}
                    time={blockedUserList[index].time}
                    greenTick={blockedUserList[index].greentick}
                    index={blockedUserList[index].index}
                  />
                  <Divider divider_style={styles.block_User_Divider} />
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  search_img_container: {
    backgroundColor: COLOR.GRAY_500,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_image: {
    height: 20,
    width: 20,
    marginStart: 24,
  },
  block_User_Divider: {
    marginVertical: 16,
  },
});
export default BlockedUserScreen;
