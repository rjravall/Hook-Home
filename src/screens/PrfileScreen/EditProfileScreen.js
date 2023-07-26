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
import { useNavigation } from '@react-navigation/native';
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

function EditProfileScreen({ route }) {
  const about_data =
    ' Interested in app development and reasearching a dating/networking app. Single and open to date or to be friends. Only interested in  guys.';
  const personalInfo = [
    { title: 'FirstName', value: 'Eric', flag: true },
    { title: 'Last Name', value: 'Gomez', flag: false },
    { title: 'Preffered Name', value: 'EG', flag: false },
    { title: 'Date of Birth', value: '29 jun, 1995', flag: true },
    { title: 'Gender', value: 'Male', flag: true },
    { title: 'Height', value: '5’10”', flag: true },
    { title: 'Weight', value: 'Male', flag: true },
    { title: 'Body Type', value: 'Stocky', flag: true },
    { title: 'Sexual Orientation', value: 'Gay', flag: true },
    { title: 'Education Level ', value: 'MBA', flag: false },
    { title: 'Star Sign ', value: 'Libra', flag: false },
    { title: 'kids', value: 'Undecided', flag: false },
  ];

  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();
  const flag = false;
  const [getPrfileList, setGetProfileList] = useState([]);
  // const [personalInfo, setpersonalInfo] = useState([])

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // modes
  const [selectedModes, setSelectedModes] = useState('');

  // add photos
  const [pickerPhoto, setPickerPhoto] = useState([]);

  // screen 1
  const [ethnicityId, setEthnicityId] = useState('');
  const [ethnicityVisible, setEthnicityVisible] = useState(false);
  const [religionId, setReligionId] = useState('');
  const [religionVisible, setReligionVisible] = useState(false);
  const [politicalId, setPoliticalId] = useState('');
  const [politicalVisible, setPoliticalVisible] = useState(false);

  // screen 2
  const [relationshipStatusId, setRelationshipStatusId] = useState('');
  const [relationshipStatuVisible, setRelationshipStatuVisible] = useState(false);
  const [genderIdentityId, setGenderIdentityId] = useState('');
  const [genderIdentityVisible, setGenderIdentityVisible] = useState(false);
  const [bodytypesId, setBodytypesId] = useState('');
  const [bodytypesVisible, setBodytypesVisible] = useState(false);
  const [sexualOrientationId, setSexualOrientationId] = useState('');
  const [sexualOrientationVisible, setSexualOrientationVisible] = useState(false);
  const [sexualPreferenceId, setSexualPreferenceId] = useState('');
  const [sexualPreferenceVisible, setSexualPreferenceVisible] = useState(false);

  // screen 3
  const [interestsId, setInterestsId] = useState([]);
  const [interestsVisible, setInterestsVisible] = useState(false);

  // screen 4
  const [kinksId, setKinksId] = useState([]);
  const [kinksVisible, setKinksVisible] = useState(false);

  // screen 5
  const [drinksId, setDrinksId] = useState('');
  const [drinksVisible, setDrinksVisible] = useState(false);
  const [exerciseId, setExerciseId] = useState('');
  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [marijuanaId, setMarijuanaId] = useState('');
  const [marijuanaVisible, setMarijuanaVisible] = useState(false);
  const [smokeId, setSmokeId] = useState('');
  const [smokeVisible, setSmokeVisible] = useState(false);
  const [petsId, setPetsId] = useState('');
  const [petsVisible, setPetsVisible] = useState(false);

  // screen 6
  const [languageId, setLanguageId] = useState('');
  const [languageVisible, setLanguageVisible] = useState(false);
  const [zodiacSignId, setZodiacSignId] = useState('');
  const [zodiacSignVisible, setZodiacSignVisible] = useState(false);
  const [tribesId, setTribesId] = useState('');
  const [tribesVisible, setTribesVisible] = useState(false);

  // screen 7
  const [personalityTypeId, setPersonalityTypeId] = useState('');
  const [personalityTypeVisible, setPersonalityTypeVisible] = useState(false);

  // job work
  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleVisible, setJobTitleVisible] = useState(false);
  const [work, setWork] = useState('');
  const [workVisible, setWorkVisible] = useState(false);
  const [study, setStudy] = useState('');
  const [items, setItems] = useState([]);
  const [studyVisible, setStudyVisible] = useState(false);


  items.map((data) => {
    console.log("items.ID :============: ", data._id)
  })


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

  // //API Calling
  // const [personalInfo, setpersonalInfo] = useState([])

  // const Checkdata = async () => {

  //   const result = await getUserDetais({})
  //   const data = result.data.data[0]
  //   setpersonalInfo(data)
  //   console.log("All Data =========================== : ", data)

  // }

  useEffect(() => {
    // Checkdata()
    onGetProfile()
  }, []);

  async function onGetProfile() {

    setIsLoading(true)
    const result = await getProfile()

    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        setGetProfileList(result.data.data)
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
        // setFirstname(result.data.data[0].firstName)
        // setLastname(result.data.data[0].lastName)
        // setPreferredName(result.data.data[0].preferredName)
        // setDateOfBirth(result.data.data[0].dateOfBirth)
        // setWeight(result.data.data[0].weight)
        // setHeight(result.data.data[0].height)
        // setSelectedModes(result.data.data[0].mode)
        // setPickerPhoto(result.data.data[0].userPhotos.publicPhotos)
        // setEthnicityId(result.data.data[0].userMeta.ethnicity._id)
        // setEthnicityVisible(result.data.data[0].firstName)
        // setReligionId(result.data.data[0].firstName)
        // setReligionVisible(result.data.data[0].firstName)
        // setPoliticalId(result.data.data[0].firstName)
        // setPoliticalVisible(result.data.data[0].firstName)
        // setRelationshipStatusId(result.data.data[0].firstName)
        // setRelationshipStatuVisible(result.data.data[0].firstName)
        // setGenderIdentityId(result.data.data[0].firstName)
        // setGenderIdentityVisible(result.data.data[0].firstName)
        // setBodytypesId(result.data.data[0].firstName)
        // setBodytypesVisible(result.data.data[0].firstName)
        // setSexualOrientationId(result.data.data[0].firstName)
        // setSexualOrientationVisible(result.data.data[0].firstName)
        // setSexualPreferenceId(result.data.data[0].firstName)
        // setSexualPreferenceVisible(result.data.data[0].firstName)
        // setInterestsId(result.data.data[0].firstName)
        // setInterestsVisible(result.data.data[0].firstName)
        // setKinksId(result.data.data[0].firstName)
        // setKinksVisible(result.data.data[0].firstName)
        // setDrinksId(result.data.data[0].firstName)
        // setDrinksVisible(result.data.data[0].firstName)
        // setExerciseId(result.data.data[0].firstName)
        // setExerciseVisible(result.data.data[0].firstName)
        // setMarijuanaId(result.data.data[0].firstName)
        // setMarijuanaVisible(result.data.data[0].firstName)
        // setSmokeId(result.data.data[0].firstName)
        // setSmokeVisible(result.data.data[0].firstName)
        // setPetsId(result.data.data[0].firstName)
        // setPetsVisible(result.data.data[0].firstName)
        // setLanguageId(result.data.data[0].firstName)
        // setLanguageVisible(result.data.data[0].firstName)
        // setZodiacSignId(result.data.data[0].firstName)
        // setZodiacSignVisible(result.data.data[0].firstName)
        // setTribesId(result.data.data[0].firstName)
        // setTribesVisible(result.data.data[0].firstName)
        // setPersonalityTypeId(result.data.data[0].firstName)
        // setPersonalityTypeVisible(result.data.data[0].firstName)
        // setJobTitle(result.data.data[0].firstName)
        // setJobTitleVisible(result.data.data[0].firstName)
        // setWork(result.data.data[0].firstName)
        // setWorkVisible(result.data.data[0].firstName)
        // setStudy(result.data.data[0].firstName)
        // setStudyVisible(result.data.data[0].firstName)
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


  useEffect(() => {
    // Checkdata()
    route.params.setShowTabBar(false);
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);

  async function onupdateProfile() {

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('firstNameVisible', true);
    formData.append('lastName', lastName);
    formData.append('lastNameVisible', true);
    formData.append('preferredName', preferredName);
    formData.append('preferredNameVisible', true);
    formData.append('about', 'This is my first account in hook');
    formData.append('aboutVisible', true);
    formData.append('height', height);
    formData.append('heightVisible', true);
    formData.append('weight', weight);
    formData.append('weightVisible', true);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('dateOfBirthVisible', true);
    formData.append('mode', selectedModes);
    pickerPhoto.forEach((item, i) => {
      formData.append("publicPhotos", {
        uri: item,
        type: "image/jpeg",
        name: `filename${i}.jpg`,
      });
    });
    formData.append('publicPhotosVisible', true);
    formData.append('privatePhotos', ["xyz.jpg"]);
    formData.append('privatePhotosVisible', true);
    formData.append('ethnicity', ethnicityId);
    formData.append('ethnicityVisible', ethnicityVisible);
    formData.append('religion', religionId);
    formData.append('religionVisible', religionVisible);
    formData.append('politicalBeliefs', politicalId);
    formData.append('politicalBeliefsVisible', politicalVisible);
    formData.append('genders', genderIdentityId);
    formData.append('gendersVisible', genderIdentityVisible);
    formData.append('bodyTypes', bodytypesId);
    formData.append('bodyTypesVisible', bodytypesVisible);
    formData.append('sexualOrientations', sexualOrientationId);
    formData.append('sexualOrientationsVisible', sexualOrientationVisible);
    formData.append('sexualPreference', sexualPreferenceId);
    formData.append('sexualPreferenceVisible', sexualPreferenceVisible);
    formData.append('interests', interestsId);
    formData.append('interestsVisible', interestsVisible);
    formData.append('kinks', kinksId);
    formData.append('kinksVisible', kinksVisible);
    formData.append('drink', drinksId);
    formData.append('drinkVisible', drinksVisible);
    formData.append('exercise', exerciseId);
    formData.append('exerciseVisible', exerciseVisible);
    formData.append('marijuana', marijuanaId);
    formData.append('marijuanaVisible', marijuanaVisible);
    formData.append('smoke', smokeId);
    formData.append('smokeVisible', smokeVisible);
    formData.append('pets', petsId);
    formData.append('petsVisible', petsVisible);
    formData.append('languages', languageId);
    formData.append('languagesVisible', languageVisible);
    formData.append('zodiacSigns', zodiacSignId);
    formData.append('zodiacSignsVisible', zodiacSignVisible);
    formData.append('tribes', tribesId);
    formData.append('tribesVisible', tribesVisible);
    formData.append('personalityTypes', personalityTypeId);
    formData.append('personalityTypesVisible', personalityTypeVisible);
    formData.append('jobTitle', jobTitle);
    formData.append('jobTitleVisible', jobTitleVisible);
    formData.append('work', work);
    formData.append('workVisible', workVisible);
    formData.append('study', study);
    formData.append('studyVisible', studyVisible);
    setIsLoading(true)
    const result = await postUpdateProfile(formData)
    setIsLoading(false)
    if (result.status) {
      if (result.data.success) {
        SHOW_TOAST(result.data.message)
      } else {
        SHOW_TOAST(result.data.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }


  return (
    // console.log("dsakhdsah")
    <NativeBaseProvider>
      {getPrfileList.length > 0 &&

        <SafeAreaView style={{
          backgroundColor: 'white',
          paddingBottom: 40,
          //  marginTop: StatusBar.currentHeight + 4,
        }}>
          <View
            style={{
              marginTop: 20,
              // paddingTop: StatusBar.currentHeight + 4,
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

                  <FlatList
                    style={{ marginTop: 16 }}
                    data={[0, 1, 2, 3, 4, 5]}
                    numColumns={3}
                    renderItem={item =>
                      <AddPhoto item={item} pickerResponse={getPrfileList[0]?.userPhotos.publicPhotos} style={{ marginRight: 8, marginTop: 8 }} />
                    }

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
                  <TouchableOpacity onPress={() =>
                    navigation.navigate(NAVIGATION.edit_information, {
                      title: 'First Name',
                      value: getPrfileList[0].firstName,
                      flag: getPrfileList[0].firstNameVisible,
                    })
                  }>
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
                          {getPrfileList[0].firstNameVisible ? 'Visible' : 'Hidden'}
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
                      title: 'Last Name',
                      value: getPrfileList[0].lastName,
                      flag: getPrfileList[0].lastNameVisible,
                    })
                  }>
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Last Name'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].lastName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].lastNameVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {getPrfileList[0].lastNameVisible ? 'Visible' : 'Hidden'}
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
                      title: 'Preffered Name',
                      value: getPrfileList[0].preferredName,
                      flag: getPrfileList[0].preferredNameVisible,
                    })
                  }>
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Preffered Name'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].preferredName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].preferredNameVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {getPrfileList[0].preferredNameVisible ? 'Visible' : 'Hidden'}
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
                      title: 'Date of Birth',
                      value: getPrfileList[0].dateOfBirth,
                      flag: getPrfileList[0].dateOfBirthVisible,
                    })
                  }>
                    <View
                      style={styles.personalInfoContainerStyle}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.titleTxtStyle}>{'Date of Birth'}</Text>
                        <Text style={styles.subTitleTxtStyle}>{getPrfileList[0].dateOfBirth}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.flagStyle, { color: getPrfileList[0].dateOfBirthVisible ? COLOR.PRIMARY : COLOR.GRAY_800 }]}>
                          {getPrfileList[0].dateOfBirthVisible ? 'Visible' : 'Hidden'}
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
                      title: 'Height',
                      value: getPrfileList[0].height,
                      flag: getPrfileList[0].firstNameVisible,
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
                            value: data["apifield"] ? data["apifield"][0].name : data.name || data.values,
                            flag: data.visible,
                            id: data._id
                          })
                        } key={i}>
                          <View
                            style={styles.personalInfoContainerStyle}>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.titleTxtStyle}>{data.title}</Text>
                              <Text style={styles.subTitleTxtStyle}>
                                {Array.isArray(data["apifield"]) ?
                                  data["apifield"].map((item, i) => {
                                    if (i == (data["apifield"].length - 1)) {
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

                  {/* {personalInfo.map((value, index) => {

                    console.log("HELLO OKKKKKK")
                    return (
                      <PersonalInfoItem
                        onPress={() =>
                          navigation.navigate(NAVIGATION.edit_information, {
                            title: value.title,
                            value: value.value,
                            flag: value.flag,
                          })
                        }
                        title={value.title}
                        value={value.value}
                        flag={value.flag}
                        key={index}
                      />
                    );
                  })} */}
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
