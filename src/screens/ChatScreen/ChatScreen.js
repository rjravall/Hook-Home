import { getMatchUser } from '@/api/user';
import { PersonPlaceholder } from '@/assets';
import AlbumList from '@/components/AlbumList';
import ChatItem from '@/components/ChatItem';
import Divider from '@/components/Divider';
import ScreenName from '@/components/ScreenName';
import WhiteButton from '@/components/WhiteButton';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { View, StyleSheet, ScrollView, Text, FlatList } from 'react-native';

function ChatScreen({ route }) {
  const TABS = ['chat', 'InactiveChat'];
  const [activeTab, SetActiveTab] = useState(TABS[1]);
  const navigation = useNavigation();
  const [Isloding, setIsLoding] = useState(true)
  const [Icon, setIcon] = useState('')
  const [Data, setData] = useState('')
  const [Image, setImage] = useState('')

  const getDetails = async () => {
    params = {
      skip: 0,
      limit: 10
    }
    setIsLoding(true)
    const result = await getMatchUser(params)
    setIsLoding(false)
    if (result.status) {
      if (result?.data?.success) {
        setIcon(result.data.data[0].chatUser.mode.icon)
        setData(result.data.data[0])
        setImage(result.data.data[0].userPhotos.publicPhotos[0])

      } else {
        console.log("ERROR")
      }
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <View
      style={{
        paddingHorizontal: 16,
        // marginTop: StatusBar.currentHeight + 4,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <SafeAreaView>
        <ScreenName name={strings.chat_screen.title} mtop={20} />
      </SafeAreaView>
      <View style={{ marginTop: 16 }}>
        <View>
          <Text
            style={{
              fontFamily: fontFamily.Medium,
              fontSize: fontSize.xmedium,
              color: COLOR.GRAY_800,
            }}>
            {strings.chat_screen.new_matches}
          </Text>
          <AlbumList privacy={false} Data={Data} />

          <View style={{ marginTop: 16 }}>
            <View style={styles.tab_container}>
              <WhiteButton
                title={strings.chat_screen.chat}
                onPress={() => SetActiveTab(TABS[1])}
                viewStyle={[
                  activeTab.match(TABS[0]) ? styles.inactive_tab : '',
                  { height: 45, flex: 1 },
                ]}
                activeStyle={!activeTab.match(TABS[0]) ? { height: 42 } : ''}
                textstyle={activeTab.match(TABS[0]) ? styles.inactive_text : ''}
                flag={activeTab.match(TABS[0]) ? false : true}
              />
              <WhiteButton
                title={strings.chat_screen.inactive_chats}
                onPress={() => SetActiveTab(TABS[0])}
                viewStyle={[
                  activeTab.match(TABS[1]) ? styles.inactive_tab : '',
                  { height: 45, flex: 1 },
                ]}
                activeStyle={!activeTab.match(TABS[1]) ? { height: 42 } : ''}
                textstyle={activeTab.match(TABS[1]) ? styles.inactive_text : ''}
                flag={activeTab.match(TABS[1]) ? false : true}
              />
            </View>
          </View>
        </View>
      </View>
      {/* <View style={{ flex: 1, marginTop: 18 }}>
        <FlatList
          data={Data}
          renderItem={item => {
            <View key={index}>
              <ChatItem
                index={Math.floor(Math.random() * 3)}
                tab={activeTab}
                time={'2:00 PM'}
                message={'Hello'}
                Data={Data}
                person_name={Data?.chatUser?.firstName + Data?.chatUser?.lastName}
                photosource={{ uri: Data?.userPhotos?.publicPhotos[0] }}
                numberOfMsg={1}
                onItemPress={() => {
                  navigation.navigate(NAVIGATION.coversation_screen);
                }}
              />
              <Divider divider_style={{ marginVertical: 16 }} />
            </View>
          }

          }
        />
      </View> */}



      <ScrollView style={{ flex: 1, marginTop: 18 }}>
        {[0].map((item, index) => {
          return (
            <View key={index}>
              <ChatItem
                index={Math.floor(Math.random() * 3)}
                tab={activeTab}
                time={'2:00 PM'}
                message={'Hello'}
                Data={Data}
                person_name={Data?.chatUser?.firstName + Data?.chatUser?.lastName}
                photosource={Data ? { uri: Data?.userPhotos?.publicPhotos[0] } : null}
                numberOfMsg={1}
                onItemPress={() => {
                  navigation.navigate(NAVIGATION.coversation_screen);
                }}
              />
              <Divider divider_style={{ marginVertical: 16 }} />
            </View>
          );
        })}
      </ScrollView>
    </View>

  );
}
const styles = StyleSheet.create({
  inactive_tab: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  inactive_text: {
    color: COLOR.GRAY_800,
  },
  active_tab: {},
  tab_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    borderColor: '#F0EBEE',
    alignItems: 'center',
  },
});

export default ChatScreen;
