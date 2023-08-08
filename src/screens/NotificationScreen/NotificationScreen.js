import { getnotifiction } from '@/api/user';
import Divider from '@/components/Divider';
import NotificationItem from '@/components/NotificationItem';
import ScreenName from '@/components/ScreenName';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const detailist = [
  {
    notificationType: "like",
    icon: require('../../assets/notifiction/like.png'),
  },
  {
    notificationType: "Match",
    icon: require('../../assets/notifiction/dislike.png'),
  },
  {
    notificationType: "dislike",
    icon: require('../../assets/notifiction/match.png'),
  }
]

const notification_data = [
  {
    date: 'Today',
    messageList: [
      {
        person_name: 'herry',
        index: 1,
        time: '1',
      },
      {
        person_name: 'herry',
        index: 0,
        time: '1',
      },
      {
        person_name: 'herry',
        index: 1,
      },
    ],
  },

  {
    date: 'Yesterday',
    messageList: [
      {
        person_name: 'herry',
        index: 2,
        time: '1',
      },
      {
        person_name: 'herry',
        index: 0,
        time: '1',
      },
      {
        person_name: 'herry',
        index: 2,
        time: '3',
      },
    ],
  },
  {
    date: '13 Jan,2023',
    messageList: [
      {
        person_name: 'herry',
        index: 1,
        time: '1',
      },
      {
        person_name: 'herry',
        index: 2,
        time: '1',
      },
      {
        person_name: 'herry',
        index: 0,
        time: '3',
      },
    ],
  },
];

function NotificationScreen(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const GetNotifiction = async () => {

    console.log("DATA :==========================: ", data)

    params = {
      limit: 5,
      skip: 0
    }
    setIsLoading(true)
    const result = await getnotifiction(params)
    console.log("Notifiction============ : ", result.data.data.result)
    setData(result.data.data.result)
    setIsLoading(false)
  }

  useEffect(() => {
    GetNotifiction()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScreenName name={strings.notification_screen.title} mtop={20} />
      <ScrollView>
        <View style={{ paddingHorizontal: 16 }}>
          <View>
            {notification_data.map((item, index) => {
              return (
                <View style={{ marginTop: 32 }} key={index}>
                  <Text style={styles.date}>
                    {notification_data[index].date}
                  </Text>
                  {notification_data[index].messageList.map((item, index) => {
                    return (
                      <View key={index}>
                        <NotificationItem
                          name={item.person_name}
                          index={item.index}
                          time={item.time}
                        />
                        <Divider />
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    marginTop: 57,
    padding: 16,
    alignItems: 'center',
  },
  date: {
    color: COLOR.GRAY_800,
    fontFamily: fontFamily.Medium,
    fontSize: fontSize.xmedium,
  },
});
export default NotificationScreen;
