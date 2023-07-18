import { LockIcon } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import React from 'react';
import { FlatList, View, Image } from 'react-native';

function AlbumList({ privacy = true }) {
  return (
    <FlatList
      style={{ marginTop: 8 }}
      data={[0, 1, 2, 4, 5, 6]}
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      contentContainerStyle={{
        marginRight: 2,
      }}
      renderItem={item => (
        <View
          style={{
            flex: 1,
            marginRight: 5,
            width: 109,
            height: 159,
          }}>
          <Image
            resizeMode="contain"
            source={require('@/assets/sample.png')}
            style={[
              CommonStyle.absoluteView,
              {
                width: 109,
                height: 159,
                borderRadius: 12,
              },
            ]}
            blurRadius={privacy ? 17 : 0}
          />
          {privacy && (
            <Image
              resizeMode="contain"
              source={LockIcon}
              style={{
                alignSelf: 'center',
                flex: 1,
              }}
            />
          )}
        </View>
      )}
    />
  );
}

export default AlbumList;
