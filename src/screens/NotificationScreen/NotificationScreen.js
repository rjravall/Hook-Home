import { getnotifiction, getReadNotifiction } from '@/api/user';
import Divider from '@/components/Divider';
import NotificationItem from '@/components/NotificationItem';
import ScreenName from '@/components/ScreenName';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { format, subDays } from 'date-fns';
import moment from 'moment';
import { FunctionOpenMenu } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const detailist = ["like", "dislike", "Match",]
function NotificationScreen(props) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [skips, setSkips] = useState(0);
  const [numOfNotification, setNumOfNotification] = useState(0);
  const [token, setTokan] = useState('');
  const [user, setUser] = useState([]);

  const getData = async () => {
    const value = await AsyncStorage.getItem('token')
    setTokan(value)
    GetReadNotifiction()

  }
  // navigation.navigate(NAVIGATION.person_details)

  const GetReadNotifiction = async () => {
    params = {
      Authorization: token
    }
    setIsLoading(true)
    const result = await getReadNotifiction(params)
    setIsLoading(false)
  }

  const GetNotifiction = async (numbers) => {
    // console.log("DATA :==========================: ", data)
    params = {
      limit: 5,
      skip: 0
    }
    const skip = "limit=10&skip=" + skips
    const result = await getnotifiction(params, skip)
    const temp = result?.data?.data?.result;
    // console.log("RESULT :==============================: ", temp)
    const list = temp.map((item) => {
      const id = item.users._id
      const update = item.createdAt;
      const date = format(new Date(update), 'yyyy-MM-dd');
      const type = item.notificationType
      const index = detailist.indexOf(type)
      const name = item.users.firstName + " " + item.users.lastName
      return { index, update, type, name, date, id };
    })
    // console.log("Notifiction============ : ", list)
    if (data.length + list.length <= numbers) {
      setData([...data, ...list])
    }

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
    GetNotifiction(numbers)
  }

  useEffect(() => {
    console.log(token)
    getData()
    GetNumberNotifiction()

  }, [navigation, isFocused])

  console.log("data  ===============: ", data)

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
              GetNotifiction(numOfNotification)
            }, 10);
          }
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <View>
            {data.map((item, index) => {
              return (
                <View key={index}>
                  {index > 0 ?
                    item.date != data[index - 1].date &&
                    <Text style={styles.date}>
                      {
                        format(new Date(subDays(new Date(), 1)), 'yyyy-MM-dd') == item.date ?
                          "Yesterday"
                          :
                          format(new Date(item.date), 'MMM d, yyyy')
                      }
                    </Text>
                    : <Text style={styles.date}>
                      {
                        format(new Date(), 'yyyy-MM-dd') == item.date ?
                          "Today"
                          :
                          format(new Date(item.date), 'MMM d, yyyy')
                      }
                    </Text>
                  }

                  <NotificationItem
                    userid={item.id}
                    name={item.name}
                    index={item.index}
                    type={item.type}
                    time={moment(item.update).fromNow().toString()}
                  />

                  {/* <Divider /> */}

                </View>
              );
            })}
          </View>
        </View>
        {
          isLoading &&
          <ActivityIndicator
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
    marginTop: 20

  },
});
export default NotificationScreen;
