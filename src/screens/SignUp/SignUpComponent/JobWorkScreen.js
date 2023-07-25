import CustomSwitch from '@/components/Switch';
import TextInputField from '@/components/TextInputField';
import Title from '@/components/Title';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function JobWorkScreen({
  jobTitle,
  setJobTitle,
  work,
  setWork,
  study,
  setStudy,
  setJobTitleVisible,
  setWorkVisible,
  setStudyVisible }) {
  const [Visible, setvisible] = useState(false)
  const [Visible1, setvisible1] = useState(false)
  const [Visible2, setvisible2] = useState(false)
  return (
    <KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <View>
          <Title
            title={strings.job_work_screen.job_title}
            style={{ fontSize: fontSize.xlarge, fontFamily: fontFamily.Medium }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Title
              title={strings.job_work_screen.profile_visibilty}
              style={[{
                marginTop: 12,
                fontSize: fontSize.small,
                fontFamily: fontFamily.Medium,
                color: "#9B9197",
              },
              Visible && { color: COLOR.BLACK80 }]}
            />

            <CustomSwitch
              containerStyle={{ marginTop: 3, marginLeft: 5 }}
              onChange={isOn => {
                [setJobTitleVisible(isOn),
                setvisible(isOn)]
              }}

            />
          </View>
          <TextInputField
            text={jobTitle}
            setText={setJobTitle}
            extraStyle={{ marginTop: 10 }}
            placeholder={strings.job_work_screen.jobtitle_placeholder}
            placeholderTextColor={"#9B9197"}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <Title
            title={strings.job_work_screen.workplace_title}
            style={{ fontSize: fontSize.xlarge, fontFamily: fontFamily.Medium }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Title
              title={strings.job_work_screen.profile_visibilty}
              style={[{
                marginTop: 12,
                fontSize: fontSize.small,
                fontFamily: fontFamily.Medium,
                color: "#9B9197",
              }, Visible1 && { color: COLOR.BLACK80 }]
              }
            />

            <CustomSwitch
              containerStyle={{ marginTop: 3, marginLeft: 5 }}
              onChange={isOn => {
                setWorkVisible(isOn),
                  setvisible1(isOn)
              }}

            />
          </View>
          <TextInputField
            text={work}
            setText={setWork}
            extraStyle={{ marginTop: 10 }}
            placeholder={strings.job_work_screen.workplace_placeholder}
            placeholderTextColor="#9B9197"

          />
        </View>

        <View style={{ marginTop: 24 }}>
          <Title
            title={strings.job_work_screen.study_title}
            style={{ fontSize: fontSize.xlarge, fontFamily: fontFamily.Medium }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Title
              title={strings.job_work_screen.profile_visibilty}
              style={[{
                marginTop: 12,
                fontSize: fontSize.small,
                fontFamily: fontFamily.Medium,
                color: "#9B9197",
              },
              Visible2 && { color: COLOR.BLACK80 }]
              }
            />

            <CustomSwitch
              containerStyle={{ marginTop: 3, marginLeft: 5 }}
              onChange={isOn => {
                [setStudyVisible(isOn),
                setvisible2(isOn)]
              }}

            />
          </View>
          <TextInputField
            text={study}
            setText={setStudy}
            extraStyle={{ marginTop: 10 }}
            placeholder={strings.job_work_screen.study_placeholder}
            placeholderTextColor={"#9B9197"}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default JobWorkScreen;
