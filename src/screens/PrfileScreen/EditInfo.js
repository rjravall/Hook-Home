import { getProfile, postUpdateProfile } from '@/api';
import { Button } from '@/components';
import ScreenName from '@/components/ScreenName';
import CustomSwitch from '@/components/Switch';
import Title from '@/components/Title';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function EditInfo({ route }) {
  const { title, value, flag } = route.params;
  const navigation = useNavigation();
  updateMasterState = value => { };
  const [text, setText] = useState(value);
  const [isLoading, setIsLoading] = useState(true)

  console.log(route.params)
  console.log("Rout :=================: ", route.params.id)
  console.log("Rout :=================: ", route.params.title)
  console.log("Rout :=================: ", route.params)


  async function onGetProfile() {

    params = {
      firstName: "JAy",
      firstNameVisible: "true / false"
    }

    setIsLoading(true)
    const result = await postUpdateProfile(params)
    setIsLoading(false)
    console.log(" :===================: ", result)
    navigation.goBack()
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <ScreenName
          name={strings.editinfo_screen.title}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.container_style}>
          <View style={{ marginTop: 32 }}>

            <TextInput
              activeUnderlineColor={COLOR.PRIMARY}
              fontFamily={fontFamily.Regular}
              theme={{ fonts: fontFamily.SemiBold }}
              textColor={COLOR.BLACK80}
              multiline={true}
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                paddingHorizontal: 0,
                textAlignVertical: 'center',
              }}
              placeholder={title}
              label={title}
              value={text}
              onChangeText={text => setText(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 24,
              }}>
              <CustomSwitch isOn={flag} />

              {
                console.log("")
              }
              <Title
                title={strings.editinfo_screen.profile_visibilty_text}
                touchableStyle={{ marginStart: 8 }}
                style={styles.profile_visibility}
              />
            </View>
          </View>
          <View style={{ flex: 1, marginBottom: 40, justifyContent: 'flex-end' }}>
            <Button
              title={strings.editinfo_screen.button}
              flag={true}
              onPress={() => onGetProfile()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  profile_visibility: {
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Regular,
    color: COLOR.BLACK80,
  },
  container_style: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
export default EditInfo;
