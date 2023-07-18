import { getModes, postUpdateProfile } from '@/api';
import ProgressView from '@/components/ProgressView';
import SignUpMode from '@/components/SignUpMode';
import Title from '@/components/Title';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

function SelectMode({ setSelectedModes, titleStyle, title = null, onPress, selectmode }) {
  const [selectedIndex, setSelectedIndex] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [getModesList, setGetModelList] = useState([]);
  const [userid, setuserid] = useState([]);

  console.log("select Mode ================================================ :=> :", selectmode)
  console.log(" CHANGE select Mode ================================================ :=> :", userid)



  useEffect(() => {
    onGetModes();
  }, []);

  async function updateUser() {
    const params = {
      mode: userid
    }
    setIsLoading(true)
    const result = await postUpdateProfile(params)
    setIsLoading(false)
    if (result.status) {
      if (result?.data?.success) {
        SHOW_SUCCESS_TOAST(result.data.message)
        console.log("===========API Calling============")

      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }
  }

  async function onGetModes() {
    setIsLoading(true)
    const result = await getModes()
    setIsLoading(false)
    if (result.data.success) {
      setGetModelList(result.data.data)
      uid = result.data.data[0]._id
      console.log("IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD : == ", uid)
      setuserid(uid)
    } else {
      SHOW_TOAST(result.data.message)
    }
  }

  return (
    <View>
      {title && <Title title={title} style={titleStyle} />}
      <FlatList
        data={getModesList}
        keyExtractor={getModesList => getModesList.id}
        renderItem={({ item }) => (
          <SignUpMode
            data={item}
            flag={selectedIndex == item.orderNo}
            onPress={() => {
              setSelectedModes(item._id)
              setSelectedIndex(item.orderNo);
              onPress(item.title);
              updateUser()
            }}
          />
        )}
      />
      {isLoading && <ProgressView />}
    </View>
  );
}

export default SelectMode;
