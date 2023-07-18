import { QuestionnaireData } from '@/screens/SignUp/Information/QuestionnaireData';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useTheme } from '@react-navigation/native';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
// import CustomSwitch from 'react-native-custom-switch';

import OptionQuestionnair from './OptionQuestionnair';
import CustomSwitch from './Switch';
import Title from './Title';
import { getEthnicity, getPoliticalBeliefs, getReligions } from '@/api';
import { SHOW_TOAST } from '@/constants/ShowToast';
import ProgressView from './ProgressView';

function QuestionnaireScreen({
  setEthnicityId,
  setReligionId,
  setPoliticalId,
  setEthnicityVisible,
  setReligionVisible,
  setPoliticalVisible,
  index,
  selectedTypesData = {},
  handleSelectedOptions,
  handleVisibleOnProfileSelection,
}) {

  const [data, setData] = useState(QuestionnaireData[index]);
  const [localselectedItems, setLocalSelectedItems] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [getEthnicityList, setGetEthnicityList] = useState([]);
  const [getReligionList, setGetReligionList] = useState([]);
  const [getBeliefsList, setGetBeliefsList] = useState([]);

  useEffect(() => {
    onGetEthnicity()
    onGetReligion()
    onGetBeliefs()
  }, []);


  useEffect(() => {

    if (selectedTypesData['typeOption'])
      setLocalSelectedItems(selectedTypesData['typeOption']);
    return () => { };
  }, []);

  async function onGetEthnicity() {
    setIsLoading(true)
    const result = await getEthnicity()
    setIsLoading(false)
    if (result.data.success) {
      setGetEthnicityList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetReligion() {
    setIsLoading(true)
    const result = await getReligions()
    setIsLoading(false)
    if (result.data.success) {
      setGetReligionList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetBeliefs() {
    setIsLoading(true)
    const result = await getPoliticalBeliefs()
    setIsLoading(false)
    if (result.data.success) {
      setGetBeliefsList(result.data)
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
    <View>
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
                title={'visible on Profile'}
                style={{
                  marginTop: 12,
                  fontSize: fontSize.small,
                  fontFamily: fontFamily.Medium,
                  color: COLOR.BLACK80,
                }}
              />

              <CustomSwitch
                containerStyle={{ marginTop: 3, marginLeft: 5 }}
                onChange={isOn => {
                  {
                    item.item == "ethnicity" ?
                      setEthnicityVisible(isOn)
                      :
                      item.item == "religion" ?
                        setReligionVisible(isOn)
                        :
                        setPoliticalVisible(isOn)

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
                data[item.item].title == "What’s your ethnicity?" ?
                  getEthnicityList.data != undefined &&
                  getEthnicityList.data.map((data, index) => {
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
                          setEthnicityId(data._id)
                          changelocalSelectedItems(item.item, data.name);
                        }}
                      />
                    );
                  })
                  :
                  data[item.item].title == "What is your religion?" ?

                    getReligionList.data != undefined &&
                    getReligionList.data.map((data, index) => {
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
                            setReligionId(data._id)
                            changelocalSelectedItems(item.item, data.name);
                          }}
                        />
                      );
                    })
                    :
                    getBeliefsList.data != undefined &&
                    getBeliefsList.data.map((data, index) => {
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
                            setPoliticalId(data._id)
                            changelocalSelectedItems(item.item, data.name);
                          }}
                        />
                      );
                    })
              }
            </View>
          </View>
        )}
      />
      {isLoading && <ProgressView />}
    </View>
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
export default QuestionnaireScreen;
