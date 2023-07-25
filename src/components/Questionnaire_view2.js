import { QuestionnaireData } from '@/screens/SignUp/Information/QuestionnaireData';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import OptionQuestionnair from './OptionQuestionnair';
import CustomSwitch from './Switch';
import Title from './Title';
import { getInterests } from '@/api';
import { SHOW_TOAST } from '@/constants/ShowToast';
import { color } from 'react-native-reanimated';

function QuestionnaireScreen2({
  setInteresQuestionnaireScreen2tsId,
  setInterestsVisible,
  index,
  selectedTypesData = {},
  handleSelectedOptions,
  handleVisibleOnProfileSelection,
}) {

  const [data, setData] = useState(QuestionnaireData[index]);
  const [localselectedItems, setLocalSelectedItems] = useState({});

  const [interestsList, setInterestsList] = useState([]);
  const [Visible, setvisible] = useState()
  const [interesteArray, setinteresteArray] = useState([])



  useEffect(() => {
    onGetInterests()
  }, []);

  useEffect(() => {
    if (selectedTypesData['typeOption'])
      setLocalSelectedItems(selectedTypesData['typeOption']);
    return () => { };
  }, []);

  async function onGetInterests() {
    const result = await getInterests()
    if (result.data.success) {
      // console.log("RESULT========================== : ", result.data[0])
      setInterestsList(result.data)
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
              }, item.index == 0 && Visible && { color: COLOR.BLACK80 }
              ]}
            />

            <CustomSwitch
              containerStyle={{ marginTop: 3, marginLeft: 5 }}
              onChange={isOn => {
                {
                  item.item == "Interests" &&
                    [setvisible(isOn),
                    setInterestsVisible(isOn)]
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
              data[item.item].title == "What is your interests?" &&
              interestsList.data != undefined &&

              interestsList.data.map((Data, index) => {
                // console.log("DATA ICON ", Data)
                return (
                  <OptionQuestionnair
                    icon={Data.icon}
                    key={index}
                    text={Data.name}
                    flag={
                      Object.keys(localselectedItems).includes(item.item) &&
                      Object.values(localselectedItems[item.item]).includes(
                        Data.name,
                      )
                    }
                    onPress={(flag) => {
                      let temp = [...interesteArray.filter(id => id != Data.id)]
                      if (flag) {
                        temp.push(Data.id);
                      }
                      setinteresteArray(temp)
                      setInteresQuestionnaireScreen2tsId(temp)
                      changelocalSelectedItems(item.item, Data.name);
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
export default QuestionnaireScreen2;
