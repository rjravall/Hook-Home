import {
  DownArrow,
  FilterIcon,
  GreenTickIcon,
  personIcon,
  SearchIcon,
} from '@/assets';

import Title from '@/components/Title';
import { NAVIGATION } from '@/constants';

import CommonStyle from '@/theme/CommonStyle';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize, width } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { Input, NativeBaseProvider, Slide } from 'native-base';
import React, { useState } from 'react';
import Geolocation from 'react-native-geolocation-service';



import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import SelectMode from '../SignUp/SignUpComponent/SelectModel';
import HomeFilterView from './HomeFilterView';
// import { UserList } from './UserData';
import UserDisplayModeTab from './UserDisplayModeTab';
import UserSwipe from './UserSwipe';
import { LogBox } from 'react-native';
import { strings } from '@/localization';
import { getModes, getProfile, getUserDetais, getUserProfile, suggestedUser } from '@/api/user';
import { useEffect } from 'react';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import Geocoder from 'react-native-geocoding';
import { mode } from 'native-base/lib/typescript/theme/tools';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function HomeScreen({ route }) {
  let [modeSelectionVisible, setModeSelectionVisible] = useState(false);
  let [dataFilterVisible, setDataFilterVisible] = useState(false);
  let [modeName, SetModeName] = useState();
  const [displayMode, SetDisplayMode] = useState(strings.homescreen_container.card);
  let navigation = useNavigation();
  const [IsLoading, setIsLoading] = useState(true)
  const [UserList, setUserList] = useState()
  const [modetype, setmodetype] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()


  function getWidthForGridItem(count) {
    return (width - 48) / count;
  }
  renderUserGridItem = userItem => {
    var isTile = displayMode == strings.homescreen_container.Ftile;
    var user = userItem.item;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(NAVIGATION.person_details, {
            user: user,
            notification: 'false'
          });
        }}>
        <View
          style={{
            width: getWidthForGridItem(isTile ? 2 : 3),
            height: getWidthForGridItem(isTile ? 2 : 3) * 1.458,
            borderRadius: 12,
            overflow: 'hidden',
            marginRight: isTile ? 13 : 8,
            marginTop: isTile ? 16 : 8,
          }}>
          {
            user.userPhotos?.publicPhotos[0] ?
              <Image
                resizeMode="cover"
                style={[{ width: '100%', height: '100%' }]}
                source={{ uri: user.userPhotos?.publicPhotos[0] }}
              />
              : null}

          <View style={style.cardTopWrapper}></View>
          <View style={style.cardBottomWrapper}>
            <LinearGradient
              colors={['transparent', 'black']}
              style={style.cardGradientView}
              angle={180.0}
              useAngle={true}
            />
            <View style={[style.userInfoWrapper, { height: isTile ? 50 : 40 }]}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={[style.userNameContainer, { height: isTile ? 20 : 15 }]}>
                  <Text
                    numberOfLines={1}
                    style={[
                      style.userNameText,
                      { fontSize: isTile ? fontSize.medium : fontSize.small },
                    ]}>
                    {user.firstName} {user.lastName}
                  </Text>
                  {user.greenTick && (
                    <Image
                      style={style.greenTickImage}
                      source={GreenTickIcon}
                    />
                  )}
                </View>
              </View>
              <View style={style.otherDetail}>
                <Text
                  style={[
                    style.placeDistanceText,
                    { fontSize: isTile ? fontSize.small : fontSize.xsmall },
                  ]}>
                  {user.age}
                </Text>
                <View style={style.placeDistanceDot} />
                <Text
                  style={[
                    style.placeDistanceText,
                    { fontSize: isTile ? fontSize.small : fontSize.xsmall },
                  ]}>
                  {user.distance}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  function renderGridUsers(numCols) {
    return (
      <View style={{ flex: 1, marginTop: 14 }}>
        <FlatList
          data={UserList}
          numColumns={numCols}
          keyExtractor={(item, index) => item.i}
          renderItem={renderUserGridItem}
        />
      </View>
    );
  }



  //API Calling
  async function getSuggestedUser(lat, lan, mode) {
    const params = {
      "location": [lat, lan],
      "distanceRange": 100000,
      "mode": mode
    }
    setIsLoading(true)
    const result = await suggestedUser(params)
    let list = [];
    if (result.status) {
      if (result?.data?.success) {
        // SHOW_SUCCESS_TOAST(result.data.message)
        console.log("===========API Calling============")


        setUserList([]);
        const p1 = result.data.data.suggestions.map(async (data, i) => {
          const loc = data.location.coordinates
          let location = "";
          await Geocoder.from({ lat: loc[0], lng: loc[1] })
            .then(response => {
              location = response.results[0].address_components[3].long_name;
            })
            .catch(error => console.warn(error));
          list.push({ ...data, location, i })
        })
        return Promise.all(p1).then(() => {
          setUserList(list);
          setIsLoading(false)
        })
      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }
  }

  async function getdetais(lat, lng) {

    const result = await getUserDetais({})
    if (result.status) {
      if (result?.data?.success) {
        const mode = result.data.data.mode
        console.log("MODD=================*****************", mode)
        getSuggestedUser(lat, lng, mode)

        const respons = await getModes()
        if (respons.data.success) {
          respons.data.data.map((item) => {
            if (item.id == mode) {
              setmodetype(item.orderNo)
              SetModeName(item.title)
            }
          })

        } else {
          SHOW_TOAST(result.data.message)
        }

        // SHOW_SUCCESS_TOAST(result.data.message)

      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }



  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        getdetais(position.coords.latitude, position.coords.longitude)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (error) => {
        console.warn("Error " + error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
    )
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback
              onPress={() => setModeSelectionVisible(true)}>
              <View
                style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <Title title={modeName} style={{ color: COLOR.BLACK80 }} />
                <Image
                  source={DownArrow}
                  resizeMode={'contain'}
                  style={{ height: 11.5, width: 11.5, marginStart: 8 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <UserDisplayModeTab onSelect={SetDisplayMode} />
          </View>
          <Slide placement="top" in={modeSelectionVisible}>
            <SafeAreaView
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}>
              {modetype && (<SelectMode
                title={strings.homescreen_dating.title}
                titleStyle={{ alignSelf: 'center' }}
                onPress={title => {
                  SetModeName(title);
                  setModeSelectionVisible(false);
                }}
                setSelectedModes={(mode) => { latitude && longitude ? getSuggestedUser(latitude, longitude, mode) : null }}
                selectmode={modetype}
              />)}

            </SafeAreaView>
          </Slide>

          <View style={{ marginTop: 20 }}>
            <Input
              variant="rounded"
              style={{ height: 44 }}
              focusOutlineColor={COLOR.GRAY_400}
              backgroundColor={COLOR.GRAY_200}
              placeholderTextColor={COLOR.GRAY_800}
              placeholder={strings.homescreen_container.search}
              fontSize={fontSize.xmedium}
              InputRightElement={
                <TouchableWithoutFeedback
                  onPress={() => {
                    route.params.setShowTabBar(false);
                    Keyboard.dismiss();
                    setDataFilterVisible(true);
                  }}>
                  <Image
                    source={FilterIcon}
                    style={{
                      height: 48,
                      width: 48,
                    }}
                  />
                </TouchableWithoutFeedback>
              }
              InputLeftElement={
                <Image
                  source={SearchIcon}
                  style={{
                    height: 20,
                    width: 20,
                    marginStart: 24,
                  }}
                />
              }
            />
          </View>

          {displayMode == strings.homescreen_container.card && !IsLoading &&

            <UserSwipe
              users={UserList}
              infoClick={user => {
                navigation.navigate(NAVIGATION.person_details, {
                  user: user,
                  route: route,
                });
              }}
              onRemove={() => {
                setUserList(
                  prepState => prepState.slice(1)
                )
              }}
              matchClick={() => navigation.navigate(NAVIGATION.matched)}
            />
          }
          {displayMode == strings.homescreen_container.grid &&
            renderGridUsers(3)}
          {displayMode == strings.homescreen_container.Ftile &&
            renderGridUsers(2)}
          {dataFilterVisible && (
            <HomeFilterView
              setDataFilterVisible={visible => {
                setDataFilterVisible(visible);
                route.params.setShowTabBar(!visible);
              }}
            />
          )}

          {(modeSelectionVisible || dataFilterVisible) && (
            <TouchableWithoutFeedback
              onPress={() => {
                route.params.setShowTabBar(true);
                setModeSelectionVisible(false), setDataFilterVisible(false);
              }}>
              <View
                style={[
                  CommonStyle.absoluteView,
                  {
                    backgroundColor: 'black',
                    opacity: 0.7,
                    zIndex: 9999,
                  },
                ]}></View>
            </TouchableWithoutFeedback>
          )}
        </SafeAreaView>

      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default HomeScreen;

const style = StyleSheet.create({
  otherDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
  placeDistanceDot: {
    padding: 2,
    marginHorizontal: 7,
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.6,
  },
  placeDistanceText: {
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.small,
    color: 'white',
    opacity: 0.6,
  },
  greenTickImage: {
    marginLeft: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userNameText: {
    fontFamily: fontFamily.SemiBold,
    color: 'white',
  },
  userNameContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  userInfoWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  cardGradientView: {
    flex: 1,
    position: 'absolute',
    opacity: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  cardBottomWrapper: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    bottom: 0,
  },
  cardTopWrapper: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    top: 0,
    flexDirection: 'row-reverse',
  },
});
