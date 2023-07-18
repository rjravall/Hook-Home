import { COLOR } from '@/theme/theme';
import { fontSize } from '@/Utils/Constant';
import React from 'react';
import { View, Image } from 'react-native';

import Title from '@/components/Title';
function PersonPersonalInfo({ user }) {
  return (
    <View style={{ height: 50 }}>
      {user &&
        user.map((value, i) => {
          return (
            <View key={i}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ height: 16, width: 16 }}
                    resizeMode="contain"
                    source={Object.values(value)[1]}
                  />
                  <Title
                    title={Object.keys(value)[0]}
                    style={{
                      marginStart: 8,
                      fontSize: fontSize.xmedium,
                      color: COLOR.GRAY_800,
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Title
                    title={Object.values(value)[0]}
                    style={{
                      fontSize: fontSize.xmedium,

                      color: COLOR.BLACK80,
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
}

export default PersonPersonalInfo;
