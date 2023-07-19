import {
  MenuIcon,
  BackIcon,
  InstaIcon,
  FacebookIcon,
  LinkedinIcon,
  TiktokIcon,
  TwitterIcon,
  PlayStationIcon,
  XboxIcon,
  NintendoIcon,
  GreenTickIcon,
  PersonPlaceholder,
} from '@/assets';
import AlbumList from '@/components/AlbumList';
import DeatilsScreenTabView from '@/components/DeatilsScreenTabView';
import OptionWithIcon from '@/components/OptionWithIcon';

import Title from '@/components/Title';
import WhiteButton from '@/components/WhiteButton';
import CommonStyle from '@/theme/CommonStyle';

import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize, isIOS } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Slide } from 'native-base';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Text,

} from 'react-native';
import { strings } from '@/localization';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserProfile } from '@/api/user';

function DetailScreen({ route }) {
  const [user, setUSer] = useState(route.params.user);
  const [items, setItems] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  console.log("items=====================", user._id)


  const detailist = [
    {
      Field: "ethnicity",
      title: "Ethnicity",
      icon: require('../../assets/userDetails/Ethnicity.png'),
    },
    {
      Field: "religion",
      title: "Religion",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "politicalBeliefs",
      title: "Political Beliefs",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "genders",
      title: "Genders",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "bodyType",
      title: "Body Type",
      icon: require('../../assets/userDetails/Body.png'),
    },
    {
      Field: "sexualOrientations",
      title: "Sexual Orientations",
      icon: require('../../assets/userDetails/Sexsual.png'),
    },
    {
      Field: "sexualPreference",
      title: "Sexual Preference",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "interests",
      title: "Interests",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "kinks",
      title: "Kinks",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "drink",
      title: "Drink",
      icon: require('../../assets/userDetails/Drinking.png'),
    },
    {
      Field: "exercise",
      title: "Exercise",
      icon: require('../../assets/userDetails/Exercise.png'),
    },
    {
      Field: "marijuana",
      title: "Marijuana",
      icon: require('../../assets/userDetails/Marijuana.png'),
    },
    {
      Field: "smoke",
      title: "Smoke",
      icon: require('../../assets/userDetails/Smoking.png'),
    },
    {
      Field: "pet",
      title: "Pet",
      icon: require('../../assets/userDetails/Pets.png'),
    },
    {
      Field: "language",
      title: "Language",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "zodiacSigns",
      title: "Zodiac Signs",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "tribes",
      title: "Tribes",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "personalityTypes",
      title: "Personality Types",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "jobTitle",
      title: "Job Title",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "work",
      title: "Work",
      icon: require('../../assets/userDetails/Gender.png'),
    },
    {
      Field: "study",
      title: "Study",
      icon: require('../../assets/userDetails/Gender.png'),
    },
  ]
  const getDetails = async () => {

    setIsLoading(true)
    const result = await getUserProfile({}, user._id)

    const Data = result.data.data[0].userMeta;

    let temp = []

    detailist.map((data) => {
      if (Data[data.Field] != undefined) {
        const apifield = Data[data.Field.toString()];
        if (Array.isArray(apifield)) {
          console.log(apifield)
          temp.push({ apifield, ...data })
          setIsLoading(false)
        } else {
          temp.push({ ...apifield, ...data })
        }
      }
    })
    console.log("Temp : ", temp)
    setItems(temp);
  }
  React.useEffect(() => {
    getDetails()
    setTimeout(
      () => {
        route.params.setShowTabBar(false);
      },
      isIOS ? 800 : 0,
    );
    return function showTab() {
      route.params.setShowTabBar(true);
    };
  }, []);
  const navigation = useNavigation();
  const [routes] = useState([
    { key: strings.detail_screen.basic_info },
    { key: strings.detail_screen.additional_info },
    { key: strings.detail_screen.spicy },
  ]);
  const social_game = [
    {
      type: 'social_media',
      social_media: [
        InstaIcon,
        FacebookIcon,
        LinkedinIcon,
        TiktokIcon,
        TwitterIcon,
      ],
    },
    { type: 'gaming', gaming: [PlayStationIcon, XboxIcon, NintendoIcon] },
  ];
  const [showReport, setShowReport] = useState(false);
  const [tabSectionHeight, setTabSectionHeight] = useState(50);

  const reportOptions = strings.report_Slider.report_options;
  const DynamicHeader = ({ animHeaderValue }) => {
    return null;
  };
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const Max_Header_Height = 200;
  const Min_Header_Height = 70;
  const Scroll_Distance = Max_Header_Height - Min_Header_Height;
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const HEADER_HEIGHT = 64;

  const renderNavBar = () => (
    <SafeAreaView >
      <View style={[styles.navbar_container]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <Image
            source={BackIcon}
            style={{ height: 16, width: 16, tintColor: 'white' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={visible => {
            setShowReport(true);
          }}>
          <Image
            source={MenuIcon}
            style={{ alignSelf: 'flex-end', height: 18, width: 4 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderContent = () => {






    return (


      <View>
        <StatusBar hidden={false} backgroundColor={'rgba(52, 52, 52, 0.8)'} />
        <View style={styles.render_content_container}>
          <View>
            <View style={styles.userdetails_container}>
              <Title title={user.firstName} style={{ marginHorizontal: 10 }} />
              <Title title={user.lastName} />
              {user.greenTick && (
                <Image
                  source={GreenTickIcon}
                  style={{ height: 16.67, marginStart: 8, width: 16.67 }}
                />
              )}
            </View>
            <View style={styles.user_distance_container}>
              <Title title={user.age} style={styles.sub_title} />
              <View style={styles.circle_subtitle} />
              <Title title={user.location} style={styles.sub_title} />
              <View style={styles.circle_subtitle} />
              <Title
                title={user.distance}
                style={styles.sub_title}
              />
            </View>

            {/* About me */}
            {user.about_me && (
              <View>
                <Title
                  title={strings.detail_screen.about_me}
                  style={[
                    styles.sub_title,
                    { fontFamily: fontFamily.Medium, marginTop: 8 },
                  ]}
                />
                <Title title={user.about_me} style={styles.about_me} />
              </View>
            )}
          </View>

          {/* Tabs */}
          <View style={{ flex: 1, height: tabSectionHeight }}>
            <DeatilsScreenTabView
              routes={routes}
              user_details={user}
              setHeight={height => {
                setTabSectionHeight(height * 52);
              }}
            />
          </View>


          {
            items.map((data, i) => {
              const isDisable = data["apifield"] ? data["apifield"]?.length < 3 : true;
              return (

                <View style={{ borderBottomWidth: 1, borderColor: "#D6D6D6" }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                    <View style={{
                      flexDirection: 'row'
                    }}>
                      <Image
                        style={{
                          height: 20,
                          width: 20
                        }}
                        resizeMode='contain'
                        source={data.icon} />

                      <Text style={{ marginLeft: 10, color: '#9B9197', }}>{data.title}</Text>
                    </View>
                    <TouchableOpacity
                      disabled={isDisable}
                      onPress={() => { }}
                    >
                      <Text style={{
                        color: "#000",
                        fontWeight: '600',
                      }}>
                        {Array.isArray(data["apifield"]) ?
                          data["apifield"].slice(0, 3).map((item, i) => {
                            if (i < 2) {
                              if (i == (data["apifield"].length - 1)) {
                                return item.name
                              } else {
                                const str = item.name + ", ";
                                return (str)
                              }
                            } else {
                              return "...";
                            }

                          })

                          : data.name || data.values}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          }


          {/* Private Album */}
          <View>
            <Title
              title={strings.detail_screen.private_album}
              style={[
                styles.album_text,
                {
                  marginTop: 8,
                },
              ]}
            />
            <AlbumList />
          </View>

          {/* Social Media Link */}

          {social_game.map((item, ind) => {
            return (
              <View>
                <Title
                  title={
                    ind == 0
                      ? strings.detail_screen.social_media_link
                      : strings.detail_screen.gaming_account
                  }
                  style={styles.album_text}
                />
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  {item[item.type].map((value, index) => {
                    return (
                      <Image
                        key={index}
                        resizeMode="contain"
                        source={value}
                        style={{ height: 30, width: 30, marginRight: 8 }}
                      />
                    );
                  })}
                </View>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 32,
            }}>
            <WhiteButton
              title={strings.detail_screen.unmatch}
              viewStyle={{ flex: 1 }}
            />
            <View style={{ width: 24 }} />
            <WhiteButton
              viewStyle={{ flex: 1 }}
              title={strings.detail_screen.report}
              onPress={visible => {
                setShowReport(true);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={SCREEN_HEIGHT * 0.57}
        extraScrollHeight={20}
        navbarColor={"#00000000"}
        backgroundImage={{ uri: user.userPhotos?.publicPhotos[0] }}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={{
          marginTop: StatusBar.currentHeight,
        }}
        contentContainerStyle={{}}
        innerContainerStyle={{}}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
      />
      <Slide
        placement="bottom"
        in={showReport}
        style={{ justifyContent: 'flex-end' }}>
        <View style={styles.slider_container}>
          <Title title={strings.report_Slider.title} />

          <FlatList
            data={reportOptions}
            renderItem={({ item, index }) => (
              <View style={{ paddingVertical: 12 }} key={index}>
                <OptionWithIcon
                  title={reportOptions[index]}
                  onPress={() => alert('hello')}
                />
              </View>
            )}
          />

          <WhiteButton
            title={strings.report_Slider.button}
            viewStyle={{ borderColor: COLOR.GRAY_800, marginVertical: 24 }}
            textstyle={{ color: COLOR.GRAY_800 }}
            onPress={() => setShowReport(false)}
          />
        </View>
      </Slide>
      {showReport && (
        <TouchableOpacity
          style={[
            CommonStyle.absoluteView,
            { backgroundColor: 'black', flex: 1, opacity: 0.6 },
          ]}
          onPress={() => {
            setShowReport(false);
          }}
        />
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  about_me: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: COLOR.BLACK80,
    marginTop: 8,
  },
  album_text: {
    fontFamily: fontFamily.Medium,
    fontSize: fontSize.xmedium,
    color: COLOR.GRAY_800,
    marginTop: 16,
  },
  slider_container: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  userdetails_container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  user_distance_container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  sub_title: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.Regular,
    color: COLOR.GRAY_800,
  },
  circle_subtitle: {
    backgroundColor: COLOR.GRAY_800,
    height: 4,
    width: 4,
    marginHorizontal: 8,
  },
  round_background: {
    backgroundColor: 'white',
    height: 48,
    width: 48,
    borderRadius: 24,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navbar_container: {
    position: 'absolute',
    marginTop: 54,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  render_content_container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    top: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
export default DetailScreen;
