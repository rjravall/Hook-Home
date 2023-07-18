import { QuestionnaireData } from '@/screens/SignUp/Information/QuestionnaireData';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import OptionQuestionnair from './OptionQuestionnair';
import CustomSwitch from './Switch';
import Title from './Title';
import { getDrinks, getExercise, getMarijuana, getSmoke, getPets } from '@/api';
import { SHOW_TOAST } from '@/constants/ShowToast';
function QuestionnaireScreen4({
  setDrinksId,
  setDrinksVisible,
  setExerciseId,
  setExerciseVisible,
  setMarijuanaId,
  setMarijuanaVisible,
  setSmokeId,
  setSmokeVisible,
  setPetsId,
  setPetsVisible,
  index,
  selectedTypesData = {},
  handleSelectedOptions,
  handleVisibleOnProfileSelection,
}) {

  const [data, setData] = useState(QuestionnaireData[index]);
  const [localselectedItems, setLocalSelectedItems] = useState({});
  const [getDrinksList, setgetDrinksList] = useState([]);
  const [getExerciseList, setgetExerciseList] = useState([]);
  const [getMarijuanaList, setgetMarijuanaList] = useState([]);
  const [getSmokeList, setgetSmokeList] = useState([]);
  const [getPetsList, setgetPetsList] = useState([]);

  useEffect(() => {
    onGetDrinks()
    onGetExercise()
    onGetMarijuana()
    onGetSmoke()
    onGetPets()

  }, []);

  useEffect(() => {
    // alert(JSON.stringify(selectedTypesData));

    if (selectedTypesData['typeOption'])
      setLocalSelectedItems(selectedTypesData['typeOption']);
    return () => { };
  }, []);

  async function onGetDrinks() {
    const result = await getDrinks()
    if (result.data.success) {
      setgetDrinksList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetExercise() {
    const result = await getExercise()
    if (result.data.success) {
      setgetExerciseList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetMarijuana() {
    const result = await getMarijuana()
    if (result.data.success) {
      setgetMarijuanaList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetSmoke() {
    const result = await getSmoke()
    if (result.data.success) {
      setgetSmokeList(result.data)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  async function onGetPets() {
    const result = await getPets()
    if (result.data.success) {
      setgetPetsList(result.data)
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
                  item.item == "drink" ?
                    setDrinksVisible(isOn)
                    :
                    item.item == "exercise" ?
                      setExerciseVisible(isOn)
                      :
                      item.item == "marijuana" ?
                        setMarijuanaVisible(isOn)
                        :
                        item.item == "smoke" ?
                          setSmokeVisible(isOn)
                          :
                          setPetsVisible(isOn)

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
              data[item.item].title == "Do you drink?" ?
                getDrinksList.data != undefined &&
                getDrinksList.data.map((data, index) => {
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
                        setDrinksId(data._id)
                        changelocalSelectedItems(item.item, data.name);
                      }}
                    />
                  );
                })
                :
                data[item.item].title == "Do you exercise?" ?

                  getExerciseList.data != undefined &&
                  getExerciseList.data.map((data, index) => {
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
                          setExerciseId(data._id)
                          changelocalSelectedItems(item.item, data.name);
                        }}
                      />
                    );
                  })
                  :
                  data[item.item].title == "Do you take marijuana?" ?
                    getMarijuanaList.data != undefined &&
                    getMarijuanaList.data.map((data, index) => {
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
                            setMarijuanaId(data._id)
                            changelocalSelectedItems(item.item, data.name);
                          }}
                        />
                      );
                    })
                    :
                    data[item.item].title == "Do you smoke?" ?
                      getSmokeList.data != undefined &&
                      getSmokeList.data.map((data, index) => {
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
                              setSmokeId(data._id)
                              changelocalSelectedItems(item.item, data.name);
                            }}
                          />
                        );
                      })
                      :
                      getPetsList.data != undefined &&
                      getPetsList.data.map((data, index) => {
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
                              setPetsId(data._id)
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
export default QuestionnaireScreen4;
