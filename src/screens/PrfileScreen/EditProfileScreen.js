import { RightIcon } from '@/assets';
import AddPhoto from '@/components/AddPhoto';
import Divider from '@/components/Divider';
import PersonalInfoItem from '@/components/PersonalInfoItem';
import ScreenName from '@/components/ScreenName';
import CustomSwitch from '@/components/Switch';
import Title from '@/components/Title';
import WhiteButton from '@/components/WhiteButton';
import { NAVIGATION } from '@/constants';
import { COLOR } from '@/theme/theme';
import { fontSize, fontFamily } from '@/Utils/Constant';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { strings } from '@/localization';
import { getProfile, postUpdateProfile } from '@/api';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import ProgressView from '@/components/ProgressView';
import { NativeBaseProvider } from 'native-base';
import { getUserDetais } from '@/api/user';
import AddPhotoSignUp from '../SignUp/SignUpComponent/AddPhotoSignUp';

function EditProfileScreen({ route }) {

  const about_data =
    ' Interested in app development and reasearching a dating/networking app. Single and open to date or to be friends. Only interested in  guys.';

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();
  const flag = false;
  const [getPrfileList, setGetProfileList] = useState([]);
  const [items, setItems] = useState([]);
  const [getPhotoAccess, SetGetPhotoAccess] = useState(false);
  const [pickerPhoto, setPickerPhoto] = useState([]);
  const [apiImage, setApiImage] = useState([]);



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

  useEffect(() => {

    onGetProfile()
  }, [navigation, isFocused]);

  async function onGetProfile() {
    setIsLoading(true)
    const result = await getProfile()
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        setGetProfileList([result.data.data])
        setApiImage(result.data.data?.userPhotos.publicPhotos)
        const Data = result.data.data.userMeta;
        let temp = []

        detailist.map((data) => {
          if (Data[data.Field] != undefined) {
            const apifield = Data[data.Field.toString()];
            temp.push({ ...apifield, ...data })
          }
        })
        setItems(temp);

        SHOW_SUCCESS_TOAST(result.data.message)
      }
      else {
        SHOW_TOAST(result?.data?.message)
      }
    }
    else {
      SHOW_TOAST(result.error)
    }

  }

  const SaveImage = async () => {
    const formData = new FormData();
    setIsLoading(true)

    apiImage.forEach((item, i) => {
      formData.append("publicPhotos", {
        uri: item,
        type: "image/jpeg",
        name: `filename${i}.jpg`,
      });
    });
    formData.append('publicPhotosVisible', true);
    console.log("FROM DATA =======>", formData)
    const result = await postUpdateProfile(formData)
    onGetProfile()
    setIsLoading(false)

  }

  useEffect(() => {
    // Checkdata()
    route.params.setShowTabBar(false);
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);

  return (

    <NativeBaseProvider>
      {getPrfileList.length > 0 &&

        <SafeAreaView style={{
          backgroundColor: 'white',
          paddingBottom: 40,

        }}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: 'white',
            }}>
            <ScreenName
              name={strings.edit_profile_screen.title}
              onBackPress={() => navigation.goBack()}
            />

            <ScrollView>
              <View style={{ marginBottom: 150 }}>
                <View style={styles.my_photos_vid_container}>
                  <Title
                    title={strings.edit_profile_screen.my_photo_vid_title}
                    style={styles.title_text_container}
                  />

                  <View style={styles.public_album_container}>
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                      <Title
                        title={strings.edit_profile_screen.public_album}
                        style={styles.public_album_text}
                      />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <CustomSwitch
                        containerStyle={styles.switch_style}
                        onChange={() => ''}
                      />
                    </View>
                  </View>
                </View>

                <Divider divider_style={styles.divider} />
                <View style={styles.screen_name_container}>
                  <View style={styles.public_album_container}>
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                      <Title
                        title={strings.edit_profile_screen.public_album}
                        style={styles.public_album_text}
                      />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <CustomSwitch
                        containerStyle={styles.switch_style}
                        onChange={() => ''}
                      />
                    </View>
                  </View>

                  {/* <FlatList
                    style={{ marginTop: 16 }}
                    data={[0, 1, 2, 3, 4, 5]}
                    numColumns={3}
                    renderItem={item =>
                      <AddPhoto item={item} pickerResponse={getPrfileList[0]?.userPhotos.publicPhotos} style={{ marginRight: 8, marginTop: 8 }} />
                    }

                  /> */}
                  <AddPhotoSignUp
                    SetGetPhotoAccess={SetGetPhotoAccess}
                    setPickerPhoto={setPickerPhoto}
                    pickerResponseList={apiImage}
                    onRemovePress={(uri) => {
                      setApiImage(apiImage.filter(item => item != uri))
                    }}
                  />
                </View>
                <Divider divider_style={styles.divider} />
                <View style={{ paddingHorizontal: 16 }}>
                  <Text style={styles.title_text_container}>
                    {strings.edit_profile_screen.about_me}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate(NAVIGATION.edit_information, {
                        value: about_data,
                        title: strings.edit_profile_screen.about_me,
                        flag: flag,
                      })
                    }>
                    <View style={styles.aboutme_txt_container}>
                      <Text
                        style={[
                          styles.public_album_text,
                          {
                            flex: 1,
                            fontSize: fontSize.xmedium,
                          },
                        ]}>
                        {about_data}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={[
                            styles.public_album_text,
                            {
                              fontSize: fontSize.xmedium,
                              marginEnd: 8,
                              color: flag ? COLOR.PRIMARY : COLOR.GRAY_800,
                            },
                          ]}>
                          {flag ? 'Visible' : 'Hidden'}
                        </Text>
                        <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <Divider divider_style={styles.divider} />
                <View style={{ paddingHorizontal: 16 }}>
                  <Text style={styles.title_text_container}>
                    {strings.edit_profile_screen.personal_info}
                  </Text>
                  <TouchableOpacity
                  // onPress={() => {

                  //   navigation.navigate(NAVIGATION.edit_information,
                  //     {
                  //       title: 'First Name',
                  //       value: getPrfileList[0].firstName,
                  //       flag: getPrfileList[0].firstNameVisible,
                  //       keys: "firstName",
                  //       keysvisibale: "firstNameVisible"
                  //     })
                  // }}
                  >
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'FirstName'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{
                          getPrfileList[0].firstName
                        }</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].firstNameVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {/* {getPrfileList[0].firstNameVisible ? 'Visible' : 'Hidden'} */}
                        </Text>
                        {/* <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={() =>

                  //   navigation.navigate(NAVIGATION.edit_information,
                  //      {
                  //     title: 'Last Name',
                  //     value: getPrfileList[0].lastName,
                  //     flag: getPrfileList[0].lastNameVisible,
                  //     keys: "lastName",
                  //     keysvisibale: "lastNameVisible"
                  //   })}
                  >
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Last Name'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].lastName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].lastNameVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {/* {getPrfileList[0].lastNameVisible ? 'Visible' : 'Hidden'} */}
                        </Text>
                        {/* <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={() =>
                  //   navigation.navigate(NAVIGATION.edit_information, {
                  //     title: 'Preffered Name',
                  //     value: getPrfileList[0].preferredName,
                  //     flag: getPrfileList[0].preferredNameVisible,
                  //     keys: "preferredName",
                  //     keysvisibale: "preferredNameVisible"

                  //   })
                  // }
                  >
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Preffered Name'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].preferredName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].preferredNameVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {/* {getPrfileList[0].preferredNameVisible ? 'Visible' : 'Hidden'} */}
                        </Text>
                        {/* <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                  //  onPress={() =>
                  //   navigation.navigate(NAVIGATION.edit_information, {
                  //     title: 'Date of Birth',
                  //     value: getPrfileList[0].dateOfBirth,
                  //     flag: getPrfileList[0].dateOfBirthVisible,
                  //     keys: "dateOfBirth",
                  //     keysvisibale: "dateOfBirthVisible"
                  //   })
                  // }
                  >
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Date of Birth'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].dateOfBirth}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].dateOfBirthVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {/* {getPrfileList[0].dateOfBirthVisible ? 'Visible' : 'Hidden'} */}
                        </Text>
                        {/* <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>
                    navigation.navigate(NAVIGATION.edit_information, {
                      title: 'Height',
                      value: getPrfileList[0].height,
                      flag: getPrfileList[0].firstNameVisible,
                      keys: "height",
                      keysvisibale: "firstNameVisible"
                    })
                  }>
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Height'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].height}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: COLOR.PRIMARY }]}>
                          {'Visible'}
                        </Text>
                        <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>
                    navigation.navigate(NAVIGATION.edit_information, {
                      title: 'Weight',
                      value: getPrfileList[0].weight,
                      flag: getPrfileList[0].weightVisible,
                      keys: "weight",
                      keysvisibale: "weightVisible"
                    })
                  }>
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Weight'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].weight}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].weightVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {getPrfileList[0].weightVisible ? 'Visible' : 'Hidden'}
                        </Text>
                        <Image
                          source={RightIcon}
                          style={{ height: 16, width: 16 }}
                          resizeMode={'contain'}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>


                  {
                    items.map((data, i) => {

                      return (
                        <TouchableOpacity onPress={() =>
                          navigation.navigate(NAVIGATION.edit_information, {
                            title: data.title,
                            value: Array.isArray(data.values) ? data.values[0].name : data.name || data.values,
                            flag: data.visible,
                            id: Array.isArray(data.values) ? data.values[0]._id : data._id,
                            keys: "userMeta",
                            innerKey: data.Field,
                            keysvisibale: data.Field + "Visible"
                          })
                        } key={i}>
                          <View
                            style={styles.personalInfoContainerStyle}>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.titleTxtStyle}>{data.title}</Text>
                              <Text style={styles.subTitleTxtStyle}>
                                {Array.isArray(data.values) ?
                                  data.values.map((item, i) => {
                                    if (i == (data.values.length - 1)) {
                                      return item.name
                                    } else {
                                      const str = item.name + ", ";
                                      return (str)
                                    }
                                  })

                                  : data.name || data.values}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={[styles.flagStyle, { color: data.visible == true ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                                {data.visible == true ? 'Visible' : 'Hidden'}
                              </Text>
                              <Image
                                source={RightIcon}
                                style={{ height: 16, width: 16 }}
                                resizeMode={'contain'}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }

                </View>
              </View>
            </ScrollView>
            <View style={styles.absolte_button}>
              <WhiteButton
                title={strings.edit_profile_screen.preview_button}
                viewStyle={{ flex: 1 }}
              />
              <View style={{ width: 8 }} />
              <WhiteButton
                title={strings.edit_profile_screen.save_button}
                flag={true}
                onPress={() => { SaveImage() }}
                viewStyle={{ flex: 1 }}
              />
            </View>

            {isLoading && <ProgressView />}


          </View>
        </SafeAreaView>
      }
    </NativeBaseProvider>


  );
}


const styles = StyleSheet.create({
  screen_name_container: { paddingHorizontal: 16 },
  my_photos_vid_container: { marginTop: 32, paddingHorizontal: 16 },
  title_text_container: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
  },
  public_album_text: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.Regular,
    color: COLOR.BLACK80,
  },
  public_album_container: {
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 4,
    backgroundColor: COLOR.WHITE_10,
    marginVertical: 16,
  },
  aboutme_txt_container: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switch_style: { marginTop: 3, marginLeft: 5 },
  absolte_button: {
    bottom: 0,
    position: 'absolute',
    height: 120,
    paddingTop: 12,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  titleTxtStyle: {
    flex: 1,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.medium,
    color: COLOR.BLACK80,
  },
  subTitleTxtStyle: {
    flex: 1,
    marginTop: 2,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.medium,
    color: COLOR.GRAY_800,
  },
  flagStyle: {
    marginEnd: 8,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.xmedium,
  },
  personalInfoContainerStyle: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  }
});

export default EditProfileScreen;
