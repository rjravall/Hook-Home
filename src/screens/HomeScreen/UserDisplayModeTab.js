import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
  CardIcon,
  CardSelectedIcon,
  Grid_2_Icon,
  Grid_2_SelectedIcon,
  Grid_3_Icon,
  Grid_3_SelectedIcon,
} from '@/assets';
import { COLOR } from '@/theme/theme';
import LinearGradient from 'react-native-linear-gradient';

export default function UserDisplayModeTab({ onSelect }) {
  const tabs = ['Grid', 'Card', 'Tile'];
  const tabImage = [Grid_3_Icon, CardIcon, Grid_2_Icon];
  const tabSelectedImage = [
    Grid_3_SelectedIcon,
    CardSelectedIcon,
    Grid_2_SelectedIcon,
  ];
  const [selectedIndex, setSelectedIndex] = useState(1);

  function getSelectedOffset() {
    return 51 * selectedIndex;
  }

  return (
    <View
      style={{
        width: 160,
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
      }}>
      <View
        style={{
          borderWidth: 1,
          flex: 1,
          flexDirection: 'row',
          height: 39,
          borderColor: COLOR.GRAY_500,
          borderRadius: 22,
        }}>
        {tabImage.map((tab, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onSelect(tabs[index]);
                setSelectedIndex(index);
              }}>
              <Image source={tab} />
            </TouchableOpacity>
          );
        })}
      </View>

      <LinearGradient
        style={{
          position: 'absolute',
          left: getSelectedOffset(),
          flex: 1,
          width: 57,
          height: 45,
          borderRadius: 22,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        colors={[COLOR.PRIMARY, COLOR.SECONDAY_FOR_SHADOW]}
        angle={90.39}
        useAngle={true}>
        <Image source={tabSelectedImage[selectedIndex]} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({});
