import { QuestionnaireData } from '@/screens/SignUp/Information/QuestionnaireData';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import OptionQuestionnair from './OptionQuestionnair';
import CustomSwitch from './Switch';
import Title from './Title';
import { getRelationshipStatus, getGenderIdentity, getBodytypes, getSexualOrientation, getSexualPreference } from '@/api';
import { SHOW_TOAST } from '@/constants/ShowToast';

function QuestionnaireScreen1({
  setRelationshipStatusId,
  setRelationshipStatuVisible,
  setGenderIdentityId,
  setGenderIdentityVisible,
  setBodytypesId,
  setBodytypesVisible,
  setSexualOrientationId,
  setSexualOrientationVisible,
  setSexualPreferenceId,
  setSexualPreferenceVisible,
  index,
  selectedTypesData = {},
  handleSelectedOptions,
  handleVisibleOnProfileSelection,
}) {

  const [data, setData] = useState(QuestionnaireData[index]);
  const [localselectedItems, setLocalSelectedItems] = useState({});
  const [relationshipStatusList, setRelationshipStatusList] = useState([]);
  const [genderIdentityList, setGenderIdentityList] = useState([]);
  const [bodytypesList, setBodytypesList] = useState([]);
  const [sexualOrientationList, setSexualOrientationList] = useState([]);
  const [sexualPreferenceList, setSexualPreferenceList] = useState([]);
  const [Visible1, setvisible1] = useState(false)
  const [Visible2, setvisible2] = useState(false)
  const [Visible3, setvisible3] = useState(false)
  const [Visible4, setvisible4] = useState(false)
  const [Visible5, setvisible5] = useState(false)

  useEffect(() => {
    onGetRelationshipStatus()
    onGetGenderIdentity()
    onGetBodytypes()
    onGetSexualOrientation()
    onGetSexualPreference()

  }, []);

  useEffect(() => {
    if (selectedTypesData['typeOption'])
      setLocalSelectedItems(selectedTypesData['typeOption']);
    return () => { };
  }, []);

  async function onGetRelationshipStatus() {
    const result = await getRelationshipStatus()
    if (result.data.success) {
      setRelationshipStatusList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetGenderIdentity() {
    const result = await getGenderIdentity()
    if (result.data.success) {
      setGenderIdentityList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetBodytypes() {
    const result = await getBodytypes()
    if (result.data.success) {
      setBodytypesList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetSexualOrientation() {
    const result = await getSexualOrientation()
    if (result.data.success) {
      setSexualOrientationList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetSexualPreference() {
    const result = await getSexualPreference()
    if (result.data.success) {
      setSexualPreferenceList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  function changelocalSelectedItems(type, option) {
    var options = [];
    if (Object.keys(localselectedItems).includes(type)) {
      options = localselectedItems[type];
    }
    if (QuestionnaireData[index][type].singleSelection) {
      options = [];
      options.push(option);
    } else {
      if (Object.values(options).includes(option))
        options = options.filter(data => data !== option);
      else options.push(option);
    }

    handleSelectedOptions({ ...localselectedItems, [type]: options }, index);
    setLocalSelectedItems(pre => ({ ...pre, [type]: options }));
  }

  return (
    <FlatList
      data={data.types}
      renderItem={item => (
        <View style={{ marginTop: item.index == 0 ? 0 : 24 }}>
          <Title
            title={data[item.item].title}
            style={{ fontSize: fontSize.xlarge, fontFamily: fontFamily.Medium }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Title
              title={'Visible on Profile'}
              style={[{
                marginTop: 12,
                fontSize: fontSize.small,
                fontFamily: fontFamily.Medium,
                color: "#9B9197",
              },
              item.index == 0 && Visible1 && { color: COLOR.BLACK80 },
              item.index == 1 && Visible2 && { color: COLOR.BLACK80 },
              item.index == 2 && Visible3 && { color: COLOR.BLACK80 },
              item.index == 3 && Visible4 && { color: COLOR.BLACK80 },
              item.index == 4 && Visible5 && { color: COLOR.BLACK80 },

              ]}
            />

            <CustomSwitch
              containerStyle={{ marginTop: 3, marginLeft: 5 }}
              onChange={isOn => {
                {
                  item.item == "relationship_status" ?
                    [setvisible1(isOn),
                    setRelationshipStatuVisible(isOn)]

                    :
                    item.item == "gender" ?
                      [setvisible2(isOn),
                      setGenderIdentityVisible(isOn)]
                      :
                      item.item == "body_type" ?
                        [setvisible3(isOn),
                        setBodytypesVisible(isOn)]
                        :
                        item.item == "sexual_orientation" ?
                          [setvisible4(isOn),
                          setSexualOrientationVisible(isOn)]
                          :
                          [setvisible5(isOn),
                          setSexualPreferenceVisible(isOn)]
                }
                handleVisibleOnProfileSelection(item.item, isOn);
              }}
              isOn={Object.values(
                selectedTypesData['typeVisibleOnProfile'],
              ).includes(item.item)}
            />
          </View>

          <View style={StyleSheet.flatten([styles.tagsView])}>
            {
              data[item.item].title == "What is your relationship status?" ?
                relationshipStatusList.data != undefined &&
                relationshipStatusList.data.map((data, index) => {
                  return (
                    <OptionQuestionnair
                      key={index}
                      text={data.name}
                      flag={
                        Object.keys(localselectedItems).includes(item.item) &&
                        Object.values(localselectedItems[item.item]).includes(
                          data.name,
                        )
                      }
                      onPress={() => {
                        setRelationshipStatusId(data._id)
                        changelocalSelectedItems(item.item, data.name);
                      }}
                    />
                  );
                })
                :
                data[item.item].title == "What is your gender identity?" ?

                  genderIdentityList.data != undefined &&
                  genderIdentityList.data.map((data, index) => {
                    return (
                      <OptionQuestionnair
                        key={index}
                        text={data.name}
                        flag={
                          Object.keys(localselectedItems).includes(item.item) &&
                          Object.values(localselectedItems[item.item]).includes(
                            data.name,
                          )
                        }
                        onPress={() => {
                          setGenderIdentityId(data._id)
                          changelocalSelectedItems(item.item, data.name);
                        }}
                      />
                    );
                  })
                  :
                  data[item.item].title == "What is your body type?" ?
                    bodytypesList.data != undefined &&
                    bodytypesList.data.map((data, index) => {
                      return (
                        <OptionQuestionnair
                          key={index}
                          text={data.name}
                          flag={
                            Object.keys(localselectedItems).includes(item.item) &&
                            Object.values(localselectedItems[item.item]).includes(
                              data.name,
                            )
                          }
                          onPress={() => {
                            setBodytypesId(data._id)
                            changelocalSelectedItems(item.item, data.name);
                          }}
                        />
                      );
                    })
                    :
                    data[item.item].title == "What is your sexual orientation?" ?
                      sexualOrientationList.data != undefined &&
                      sexualOrientationList.data.map((data, index) => {
                        return (
                          <OptionQuestionnair
                            key={index}
                            text={data.name}
                            flag={
                              Object.keys(localselectedItems).includes(item.item) &&
                              Object.values(localselectedItems[item.item]).includes(
                                data.name,
                              )
                            }
                            onPress={() => {
                              setSexualOrientationId(data._id)
                              changelocalSelectedItems(item.item, data.name);
                            }}
                          />
                        );
                      })
                      :
                      sexualPreferenceList.data != undefined &&
                      sexualPreferenceList.data.map((data, index) => {
                        return (
                          <OptionQuestionnair
                            key={index}
                            text={data.name}
                            flag={
                              Object.keys(localselectedItems).includes(item.item) &&
                              Object.values(localselectedItems[item.item]).includes(
                                data.name,
                              )
                            }
                            onPress={() => {
                              setSexualPreferenceId(data._id)
                              changelocalSelectedItems(item.item, data.name);
                            }}
                          />
                        );
                      })
            }
            {/* {data[item.item].options.map((option, index) => {
              return (
                <OptionQuestionnair
                  icon={
                    Object.hasOwn(data[item.item], 'optionImage')
                      ? data[item.item].optionImage[index]
                      : false
                  }
                  key={index}
                  text={option}
                  flag={
                    Object.keys(localselectedItems).includes(item.item) &&
                    Object.values(localselectedItems[item.item]).includes(
                      option,
                    )
                  }
                  onPress={() => {
                    changelocalSelectedItems(item.item, option);
                  }}
                />
              );
            })} */}
          </View>
        </View>
      )}
    />
  );
}

const styles = {
  tagsView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
};
export default QuestionnaireScreen1;
