import { QuestionnaireData } from '@/screens/SignUp/Information/QuestionnaireData';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import OptionQuestionnair from './OptionQuestionnair';
import CustomSwitch from './Switch';
import Title from './Title';
import { getPersonalityType } from '@/api';
import { SHOW_TOAST } from '@/constants/ShowToast';

function QuestionnaireScreen6({
  setPersonalityTypeId,
  setPersonalityTypeVisible,
  index,
  selectedTypesData = {},
  handleSelectedOptions,
  handleVisibleOnProfileSelection,
}) {

  const [data, setData] = useState(QuestionnaireData[index]);
  const [localselectedItems, setLocalSelectedItems] = useState({});
  const [getPersonalityTypeList, setgetPersonalityTypeList] = useState([]);

  useEffect(() => {
    onGetPersonalityType()
  }, []);

  useEffect(() => {
    if (selectedTypesData['typeOption'])
      setLocalSelectedItems(selectedTypesData['typeOption']);
    return () => { };
  }, []);


  async function onGetPersonalityType() {
    const result = await getPersonalityType()
    if (result.data.success) {
      setgetPersonalityTypeList(result.data)
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
                  item.item == "personality" &&
                    setPersonalityTypeVisible(isOn)
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
              data[item.item].title == "What is your personality type?" &&
              getPersonalityTypeList.data != undefined &&
              getPersonalityTypeList.data.map((data, index) => {
                return (
                  <OptionQuestionnair
                    icon={data.icon}
                    key={index}
                    text={data.name}
                    flag={
                      Object.keys(localselectedItems).includes(item.item) &&
                      Object.values(localselectedItems[item.item]).includes(
                        data.name,
                      )
                    }
                    onPress={() => {
                      setPersonalityTypeId(data._id)
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
export default QuestionnaireScreen6;
