import AddPhoto from '@/components/AddPhoto';
import Title from '@/components/Title';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import React, { useState } from 'react';
import { strings } from '@/localization';
import { useCallback } from 'react';
import * as ImagePicker from 'react-native-image-picker';

function AddPhotoSignUp({ SetGetPhotoAccess, setPickerPhoto, pickerResponseList, onRemovePress }) {


  const [pickerResponse, setPickerResponse] = useState(pickerResponseList ? pickerResponseList : []);
  const [NonpickerResponse, setNonPickerResponse] = useState([0, 1, 2, 3, 4, 5]);

  const [fileName, setfileName] = useState('');
  const array = pickerResponseList ? pickerResponseList : [];

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else
      return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      let permission = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]

      let status = await PermissionsAndroid.requestMultiple(permission)

      if (status = PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    };
    return true
  };

  const onImageLibraryPress = useCallback(async () => {
    const options = {
      selectionLimit: 2,
      mediaType: 'photo',
      includeBase64: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.assets) {
          const fileName = response.assets[0].uri.split('/').pop();
          setfileName(fileName)

          for (let i = 0; i < response.assets.length; i++) {
            array.push(response.assets[i].uri);
            console.log("ARRRYYYYYYYYYYYYYYYYYYYYYYYYYY ", response.assets[i].uri)

          }
          setPickerResponse(array)
          setPickerPhoto(array)
          setNonPickerResponse([])
          setNonPickerResponse([0, 1, 2, 3, 4, 5])
        }
      });

    }
  }, []);

  return (
    <View>
      <Title title={strings.add_photos.title} />
      <Title
        title={strings.add_photos.subtitle}
        style={{
          fontSize: fontSize.xmedium,
          fontFamily: fontFamily.Medium,
          color: COLOR.GRAY_800,
          marginTop: 8,
        }}
      />
      <FlatList
        style={{ marginTop: 16 }}
        data={NonpickerResponse}
        numColumns={3}
        renderItem={item =>
          <AddPhoto
            item={item}
            pickerResponse={pickerResponse}
            style={{ marginRight: 8, marginTop: 8 }}
            onImageLibraryPress={onImageLibraryPress}
            onRemovePress={(uri) => { onRemovePress(uri) }} />
        }

      />


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

export default AddPhotoSignUp;
