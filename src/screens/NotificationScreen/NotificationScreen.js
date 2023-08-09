import { getnotifiction } from '@/api/user';
import Divider from '@/components/Divider';
import NotificationItem from '@/components/NotificationItem';
import ScreenName from '@/components/ScreenName';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import moment from 'moment';

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const detailist = ["like", "dislike", "Match",]

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
  const [data, setData] = useState([]);
  const [skips, setSkips] = useState(0);
  const [numOfNotification, setNumOfNotification] = useState(0);

  const GetNotifiction = async () => {
    console.log("DATA :==========================: ", data)
    params = {
      limit: 5,
      skip: 0
    }
    const skip = "limit=10&skip=" + skips
    const result = await getnotifiction(params, skip)
    const temp = result?.data?.data?.result;
    const list = temp.map((item) => {
      const update = moment(item.createdAt).fromNow();
      const type = item.notificationType
      const index = detailist.indexOf(type)
      const name = item.users.firstName + " " + item.users.lastName
      return { index, update, type, name, };
    })
    console.log("Notifiction============ : ", list)
    setData([...data, ...list])


    setIsLoading(false)
  }

  const GetNumberNotifiction = async () => {
    setIsLoading(true);
    params = {
      limit: 5,
      skip: 0
    }
    const skip = "limit=1&skip=0"
    const result = await getnotifiction(params, skip)
    const numbers = result?.data?.data?.noOfNotifications
    setNumOfNotification(numbers)
    GetNotifiction()
  }

  useEffect(() => {
    GetNumberNotifiction()

  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScreenName name={strings.notification_screen.title} mtop={20} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(event) => {
          const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
            data.length <= numOfNotification) {
            setIsLoading(true)
            setSkips(skips + 10)
            setTimeout(() => {
              GetNotifiction()
            }, 10);
          }
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <View>
            {data.map((item, index) => {
              return (
                <View key={index}>
                  {/* <Text style={styles.date}>
                    {notification_data[index].date}
                  </Text> */}
                  <NotificationItem
                    name={item.name}
                    index={item.index}
                    time={item.update}
                  />
                  <Divider />
                  {/* {notification_data[index].messageList.map((item, index) => {
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
                  })} */}
                </View>
              );
            })}
          </View>
        </View>
        {
          isLoading &&
          <ActivityIndicator
            // size={'large'}
            color={"#E6256F"}
            style={{
              alignSelf: 'center',
              margin: 10,
            }}
          />
        }
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
