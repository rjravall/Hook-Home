import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, NativeBaseProvider, Slide } from 'native-base';

import { fontFamily, fontSize, width } from '@/Utils/Constant';
import { TabView } from 'react-native-tab-view';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import PersonalInformation from '../SignUpComponent/PersonalInformation';
import BackButton from '@/components/BackButton';
import SelectMode from '../SignUpComponent/SelectModel';
import AddPhotoSignUp from '../SignUpComponent/AddPhotoSignUp';
import QuestionnaireScreen from '@/components/Questionnaire_view';
import QuestionnaireScreen1 from '@/components/Questionnaire_view1';
import QuestionnaireScreen2 from '@/components/Questionnaire_view2';
import QuestionnaireScreen3 from '@/components/Questionnaire_view3';
import QuestionnaireScreen4 from '@/components/Questionnaire_view4';
import QuestionnaireScreen5 from '@/components/Questionnaire_view5';
import QuestionnaireScreen6 from '@/components/Questionnaire_view6';
import WhiteButton from '@/components/WhiteButton';
import { COLOR } from '@/theme/theme';
import { GalleryIcon } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import JobWorkScreen from '../SignUpComponent/JobWorkScreen';
import { NAVIGATION } from '@/constants';
import LinearGradient_primary from '@/components/LinearGradient_primary';
import { strings } from '@/localization';
import { SHOW_TOAST } from '@/constants/ShowToast';
import { setFName, setLName, setPrefreName, setDOB, setHeightvalue, setWeightvalue } from '@/Utils/PrefrenceData';
import { postUpdateProfile } from '@/api';
import ProgressView from '@/components/ProgressView';

export default function Information({ route }) {
  const [getPhotoAccess, SetGetPhotoAccess] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [selectedQuestionnaireOption, setSelectedQuestionnaireOption] = useState({});
  const [typeVisibleOnProfile, setTypeVisibleOnProfile] = useState([]);
  const [index, setIndex] = useState(parseInt(route.params?.index));
  const [isLoading, setIsLoading] = useState(false)
  const [isFirst, setIsFirst] = useState(false);

  //personal information
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
  const [studyVisible, setStudyVisible] = useState(false);
  const [routes] = useState([
    { key: 'PersonalInformation' },
    { key: 'Mode' },
    { key: 'AddPhoto' },
    { key: '0' },
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
    { key: '6' },
    { key: 'Other' },
  ]);

  function handleQuestionnaireSelection(selectedOptions, index) {
    var pre = selectedQuestionnaireOption;
    pre[index] = selectedOptions;
    setSelectedQuestionnaireOption(pre);
  }

  function handleVisibleOnProfileSelection(type, isOn) {
    if (Object.values(typeVisibleOnProfile).includes(type) && !isOn)
      setTypeVisibleOnProfile(
        typeVisibleOnProfile.filter(item => item != type),
      );
    else if (!Object.values(typeVisibleOnProfile).includes(type) && isOn) {
      setTypeVisibleOnProfile(pre => {
        return [...pre, type];
      });
    }
  }

  const QuestionnaireRoute = index => (
    <QuestionnaireScreen
      setEthnicityId={setEthnicityId}
      setReligionId={setReligionId}
      setPoliticalId={setPoliticalId}
      setEthnicityVisible={setEthnicityVisible}
      setReligionVisible={setReligionVisible}
      setPoliticalVisible={setPoliticalVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );

  const QuestionnaireRoute1 = index => (
    <QuestionnaireScreen1
      setRelationshipStatusId={setRelationshipStatusId}
      setRelationshipStatuVisible={setRelationshipStatuVisible}
      setGenderIdentityId={setGenderIdentityId}
      setGenderIdentityVisible={setGenderIdentityVisible}
      setBodytypesId={setBodytypesId}
      setBodytypesVisible={setBodytypesVisible}
      setSexualOrientationId={setSexualOrientationId}
      setSexualOrientationVisible={setSexualOrientationVisible}
      setSexualPreferenceId={setSexualPreferenceId}
      setSexualPreferenceVisible={setSexualPreferenceVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );

  const QuestionnaireRoute2 = index => (
    <QuestionnaireScreen2
      setInteresQuestionnaireScreen2tsId={setInterestsId}
      setInterestsVisible={setInterestsVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );

  const QuestionnaireRoute3 = index => (
    <QuestionnaireScreen3
      setKinksId={setKinksId}
      setKinksVisible={setKinksVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );

  const QuestionnaireRoute4 = index => (
    <QuestionnaireScreen4
      setDrinksId={setDrinksId}
      setDrinksVisible={setDrinksVisible}
      setExerciseId={setExerciseId}
      setExerciseVisible={setExerciseVisible}
      setMarijuanaId={setMarijuanaId}
      setMarijuanaVisible={setMarijuanaVisible}
      setSmokeId={setSmokeId}
      setSmokeVisible={setSmokeVisible}
      setPetsId={setPetsId}
      setPetsVisible={setPetsVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );

  const QuestionnaireRoute5 = index => (
    <QuestionnaireScreen5
      setLanguageId={setLanguageId}
      setLanguageVisible={setLanguageVisible}
      setZodiacSignId={setZodiacSignId}
      setZodiacSignVisible={setZodiacSignVisible}
      setTribesId={setTribesId}
      setTribesVisible={setTribesVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );

  const QuestionnaireRoute6 = index => (
    <QuestionnaireScreen6
      setPersonalityTypeId={setPersonalityTypeId}
      setPersonalityTypeVisible={setPersonalityTypeVisible}
      index={index}
      selectedTypesData={{
        typeOption: selectedQuestionnaireOption[index],
        typeVisibleOnProfile,
      }}
      handleSelectedOptions={handleQuestionnaireSelection}
      handleVisibleOnProfileSelection={handleVisibleOnProfileSelection}
    />
  );


  const initialLayout = {
    width: width,
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'PersonalInformation':
        return <PersonalInformation
          firstName={firstName}
          setFirstname={setFirstname}
          lastName={lastName}
          setLastname={setLastname}
          preferredName={preferredName}
          setPreferredName={setPreferredName}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight} />;
      case 'Mode':
        return (
          <SelectMode
            setSelectedModes={setSelectedModes}
            title={strings.select_dating_mode.title}
            onPress={() => { }}
          />
        );
      case 'AddPhoto':
        return <AddPhotoSignUp SetGetPhotoAccess={SetGetPhotoAccess} setPickerPhoto={setPickerPhoto} />;
      case '0':
        return QuestionnaireRoute(parseInt(route.key));
      case '1':
        return QuestionnaireRoute1(parseInt(route.key));
      case '2':
        return QuestionnaireRoute2(parseInt(route.key));
      case '3':
        return QuestionnaireRoute3(parseInt(route.key));
      case '4':
        return QuestionnaireRoute4(parseInt(route.key));
      case '5':
        return QuestionnaireRoute5(parseInt(route.key));
      case '6':
        return QuestionnaireRoute6(parseInt(route.key));
      case 'Other':
        return <JobWorkScreen
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          work={work}
          setWork={setWork}
          study={study}
          setStudy={setStudy}
          setJobTitleVisible={setJobTitleVisible}
          setWorkVisible={setWorkVisible}
          setStudyVisible={setStudyVisible}
        />;
    }

  };

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row" style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const borderColor = index >= i ? colors.primary : COLOR.GRAY_500;
          return (
            <Box
              key={i}
              mr="1"
              borderBottomWidth="2"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              cursor="pointer"></Box>
          );
        })}
      </Box>
    );
  };

  function onNextClick() {
    if (index == 0) {
      const validName = new RegExp('^[a-zA-Z]+$');
      const floatingPoint = new RegExp('^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$');
      if (!validName.test(firstName)) {
        SHOW_TOAST(strings.toast_success_message.enter_fName)
      } else if (!validName.test(lastName)) {
        SHOW_TOAST(strings.toast_success_message.enter_LName)
      } else if (!dateOfBirth) {
        SHOW_TOAST(strings.toast_success_message.enter_dob)
      } else if (!height || parseInt(height.split(".")[0]) > 8 || parseInt(height.split(".")[1]) > 11 || !floatingPoint.test(height)) {
        // 1 kilogram (kg) is equal to 2.20462262185 pounds (lbs)
        SHOW_TOAST(strings.toast_success_message.enter_height)
      } else if (!weight || parseFloat(weight) > 500 || !floatingPoint.test(weight)) {
        SHOW_TOAST(strings.toast_success_message.enter_weight)
      } else {
        onupdateProfile()
      }
    } else if (index == 1) {
      if (!selectedModes) {
        SHOW_TOAST(strings.toast_success_message.select_modes)
      } else {
        onupdateProfile()
      }
    } else if (index == 2) {
      if (pickerPhoto.length < 2) {
        SHOW_TOAST(strings.toast_success_message.select_photo)
      } else {
        onupdateProfile()
      }
    } else {
      onupdateProfile()
    }
  }

  async function onupdateProfile() {
    const formData = new FormData();

    formData.append('index', index + 1);
    if (index == 0) {


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
    } else if (index == 1) {
      formData.append('mode', selectedModes);
    } else if (index == 2) {
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
    } else if (index == 3) {
      formData.append('ethnicity', ethnicityId);
      formData.append('ethnicityVisible', ethnicityVisible);
      formData.append('religion', religionId);
      formData.append('religionVisible', religionVisible);
      formData.append('politicalBeliefs', politicalId);
      formData.append('politicalBeliefsVisible', politicalVisible);
    } else if (index == 4) {
      formData.append('genders', genderIdentityId);
      formData.append('gendersVisible', genderIdentityVisible);
      formData.append('bodyTypes', bodytypesId);
      formData.append('bodyTypesVisible', bodytypesVisible);
      formData.append('sexualOrientations', sexualOrientationId);
      formData.append('sexualOrientationsVisible', sexualOrientationVisible);
      formData.append('sexualPreference', sexualPreferenceId);
      formData.append('sexualPreferenceVisible', sexualPreferenceVisible);
    } else if (index == 5) {
      interestsId.map((id, i) => {
        formData.append('interests', id);
      })
      formData.append('interestsVisible', interestsVisible);
    } else if (index == 6) {
      formData.append('kinks', kinksId);
      formData.append('kinksVisible', kinksVisible);
    } else if (index == 7) {
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
    } else if (index == 8) {
      formData.append('languages', languageId);
      formData.append('languagesVisible', languageVisible);
      formData.append('zodiacSigns', zodiacSignId);
      formData.append('zodiacSignsVisible', zodiacSignVisible);
      formData.append('tribes', tribesId);
      formData.append('tribesVisible', tribesVisible);
    } else if (index == 9) {
      formData.append('personalityTypes', personalityTypeId);
      formData.append('personalityTypesVisible', personalityTypeVisible);
    } else if (index == 10) {
      formData.append('jobTitle', jobTitle);
      formData.append('jobTitleVisible', jobTitleVisible);
      formData.append('work', work);
      formData.append('workVisible', workVisible);
      formData.append('study', study);
      formData.append('studyVisible', studyVisible);
    }

    console.log("fromdata::>>>", formData)
    setIsLoading(true)
    const result = await postUpdateProfile(formData)
    console.log("resulti::>>>", result)
    setIsLoading(false)
    if (result.status) {
      if (result.data.success) {
        if (index == 10) {
          navigation.navigate(NAVIGATION.set_locaion_screen)
        } else {
          setIndex(index + 1)
        }
      } else {
        SHOW_TOAST(result.data.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }

  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 16, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.pageNumber}>
            <Text style={styles.current_index_number}>{index + 1}</Text>

            <Text style={styles.total_page_number_text}>/ {routes.length}</Text>
          </View>
          {index >= 3 && (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                onNextClick()
                // index < 10
                //   ? onNextClick()
                //   : onupdateProfile()
                // navigation.navigate(NAVIGATION.set_locaion_screen)
              }>
              <Text style={styles.skip_btn}>
                {strings.information_screen.skip}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          swipeEnabled={false}
          initialLayout={initialLayout}
          style={{
            marginTop: 11,
          }}
        />
        <View style={styles.bottomNavigation}>
          {index != parseInt(route.params.index) && (
            <BackButton
              onPress={() => {
                setIndex(index - 1);
              }}
            />
          )}
          <Button
            title={strings.information_screen.button}
            flag={true}
            style={{ flex: 1 }}
            onPress={() => {
              onNextClick()
              // index < 10
              //   ? onNextClick()
              //   : onupdateProfile()
              // navigation.navigate(NAVIGATION.set_locaion_screen);
            }}
          />
        </View>
      </SafeAreaView>
      <Slide
        placement="bottom"
        in={getPhotoAccess}
        style={{ justifyContent: 'flex-end' }}>
        <View style={styles.slider_container}>
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            <LinearGradient_primary style={styles.slider_image_container}>
              <Image
                style={{ tintColor: 'white', width: 22, height: 22 }}
                source={GalleryIcon}
                resizeMode="contain"
              />
            </LinearGradient_primary>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title_style}>
              {strings.delete_slider.title}
            </Text>
            <Text style={styles.subtitle_rating}>
              {strings.delete_slider.subtitle}
            </Text>
          </View>

          <View style={styles.slider_button_container}>
            <WhiteButton
              title={strings.delete_slider.cancle_button_text}
              viewStyle={styles.common_button_style}
              textstyle={{ color: COLOR.GRAY_800 }}
              onPress={() => SetGetPhotoAccess(false)}
            />
            <View style={{ width: 8 }} />
            <WhiteButton
              title={strings.delete_slider.delete_button_text}
              viewStyle={{ flex: 1 }}
              flag={true}
            />
          </View>
        </View>
      </Slide>
      {getPhotoAccess && (
        <TouchableOpacity
          style={[
            CommonStyle.absoluteView,
            { backgroundColor: 'black', flex: 1 },
          ]}
          onPress={() => SetGetPhotoAccess(false)}
        />
      )}
      {isLoading && <ProgressView />}

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    marginTop: 10,
    marginBottom: 38,
  },
  pageNumber: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  bottomNavigation: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  common_button_style: {
    borderWidth: 1,
    flex: 1,
    borderColor: COLOR.GRAY_500,
  },
  title_style: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: fontSize.xlarge,
    fontFamily: fontFamily.SemiBold,
    color: COLOR.BLACK90,
  },
  subtitle_rating: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Medium,
    color: COLOR.GRAY_800,
    textAlign: 'center',
    marginTop: 12,
  },
  skip_btn: {
    alignSelf: 'flex-end',
    marginEnd: 16,
    marginTop: 48,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: COLOR.BLACK90,
    alignSelf: 'flex-end',
  },
  slider_container: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  slider_image_container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 32,
  },
  current_index_number: {
    color: COLOR.BLACK80,
    fontSize: fontSize.xlarge,
    fontFamily: fontFamily.SemiBold,
  },
  total_page_number_text: {
    fontSize: fontSize.medium,
    color: COLOR.GRAY_800,
    fontFamily: fontFamily.Light,
  },
});
