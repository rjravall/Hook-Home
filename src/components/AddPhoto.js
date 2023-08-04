import { AddIcon } from '@/assets';
import { COLOR } from '@/theme/theme';
import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

function AddPhoto({ item, pickerResponse, style, onImageLibraryPress, onRemovePress }) {

  return (
    <View style={[styles.addphoto_container, style]}>
      {
        pickerResponse == undefined ?
          <Image source={AddIcon} style={{ height: 25, width: 25 }} />
          :
          pickerResponse[item.index] == undefined ?
            <TouchableOpacity onPress={onImageLibraryPress}>
              <Image source={AddIcon} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            :
            <View>
              <Image source={{ uri: pickerResponse[item.index] }} style={{ height: 160, width: 110, borderRadius: 12, borderWidth: 1.5 }} />
              <TouchableOpacity
                style={{ position: 'absolute', height: 40, width: 40, right: 0, bottom: 0 }}
                onPress={() => onRemovePress(pickerResponse[item.index])}
              >
                <Image
                  style={{ resizeMode: "cover", height: "100%", width: "100%" }}
                  source={require('../../src/assets/RemoveImage.png')} />
              </TouchableOpacity>
            </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  addphoto_container: {
    borderColor: COLOR.GRAY_BORDER,
    height: 160,
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    borderStyle: 'dashed',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AddPhoto;
