import PersonPersonalInfo from '@/screens/PersonalDetail/PersonPersonalInfo';
import { COLOR } from '@/theme/theme';
import { width } from '@/Utils/Constant';
import { Box, NativeBaseProvider, useColorModeValue } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TabView } from 'react-native-tab-view';

function DeatilsScreenTabView({ routes, user_details, setHeight }) {
  const [index, setIndex] = useState(-1);
  const initialLayout = {
    width: width,
  };

  const renderTabBar = props => {
    if (index == -1) {
      setTabInfoHeightForSection(0);
    }
    return (
      <Box flexDirection="row" style={{ backgroundColor: 'white' }}>
        {props.navigationState.routes.map((route, i) => {
          const borderColor =
            index === i
              ? COLOR.PRIMARY
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <TouchableOpacity
              key={i}
              style={{
                flex: 1,
                height: 25,
              }}
              onPress={() => {
                setTabInfoHeightForSection(i);
              }}>
              <Box
                mr="4"
                borderBottomWidth="3"
                borderColor={borderColor}
                flex={1}
                cursor="pointer">
                {route.key}
              </Box>
            </TouchableOpacity>
          );
        })}
      </Box>
    );
  };

  const renderScene = ({ route }) => {
    if (isNaN(parseInt(route.key))) {
      switch (route.key) {
        case 'Basic Info': {
          return <PersonPersonalInfo user={user_details.basicInfo} />;
        }
        case 'Additional Info': {
          return <PersonPersonalInfo user={user_details.additionalInfo} />;
        }
        case 'Spicy': {
          return <PersonPersonalInfo user={user_details.spicy} />;
        }
      }
    }
  };

  function setTabInfoHeightForSection(section) {
    let infoArr = [
      user_details.basicInfo,
      user_details.additionalInfo,
      user_details.spicy,
    ];
    setHeight(infoArr[section] ? infoArr[section].length : 1);
    setIndex(section);
  }

  return (
    <NativeBaseProvider>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => {
          setTabInfoHeightForSection(index);
        }}
        initialLayout={initialLayout}
        style={{
          marginTop: 16,
        }}
      />
    </NativeBaseProvider>
  );
}

export default DeatilsScreenTabView;
