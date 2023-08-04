import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import React, { ReactNode, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  View, TextInput, Image, KeyboardAvoidingView, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, StatusBar
} from 'react-native'
import { COLOR } from '@/theme/theme'
import LinearGradient_primary from '@/components/LinearGradient_primary';
import { BackIcon, ChatLikeIcon, ClipIcon, MenuIcon, MicIcon, personIcon, PersonPlaceholder, ProfileIcon, SendMessageIcon, VideoCallIcon, VoiceCallIcon } from '@/assets'
import { Row } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { fontFamily, fontSize, isIOS } from '@/Utils/Constant'
import ScreenName from '@/components/ScreenName'
import Title from '@/components/Title'
import { useNavigation } from '@react-navigation/native'
import CommonStyle from '@/theme/CommonStyle'
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler'


// For the testing purposes, you should probably use https://github.com/uuidjs/uuid
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}

const ConversationScreen = ({ route }) => {
  const [localselectedMessages, setLocalSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }
  const navigation = useNavigation();
  const likeMessageArray = [];
  React.useEffect(() => {

    const textMessage1 = {
      author: { id: "1111", imageUrl: 'https://www.aufini.com/image/222365.jpg' },
      createdAt: Date.now(),
      id: "06c33e8c",
      text: "you whatsup? whats your plan this weekend?",
      type: 'text',
    }


    const textMessage2 = {
      author: user,
      createdAt: Date.now(),
      id: "06c33e8f",
      text: "Hello how are you?",
      type: 'text',
    }

    const textMessage3 = {
      author: { id: "1111", imageUrl: 'https://www.aufini.com/image/222365.jpg' },
      createdAt: Date.now(),
      id: "06c33e8b",
      text: "Im fine, thanks!",
      type: 'text',
    }

    setMessages([textMessage3, textMessage2, textMessage1]);

    setTimeout(() => {
      route.params.setShowTabBar(false);
    }, isIOS ? 600 : 0);
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);


  const addMessage = (message) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message) => {
    if (message.length == 0) return;
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message,
      type: 'text',
    }
    addMessage(textMessage)
    setInput("");
  }

  const renderInputView = () => {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'white' }}
        bounces={true}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.inputView}>
          <View style={styles.input_options_container}>
            <TouchableOpacity onPress={() => { alert("mic") }} style={styles.input_options_image_container}><Image source={MicIcon} style={{ width: 20, height: 20 }} /></TouchableOpacity>
            <TouchableOpacity onPress={() => { alert("attach") }} style={styles.input_options_image_container}><Image source={ClipIcon} style={{ width: 20, height: 20 }} /></TouchableOpacity>
            <TextInput placeholderTextColor={COLOR.GRAY_800} fontFamily={fontFamily.Regular} value={input} style={{ flex: 1, paddingLeft: 16, color: COLOR.BLACK90 }} placeholder={'Send a message'} onChangeText={text => setInput(text)} />
          </View>
          <TouchableOpacity onPress={() => {
            handleSendPress(input)
          }}>
            <LinearGradient_primary style={styles.send_btn_container}>
              <Image style={{ tintColor: 'white', width: 22, height: 22 }} source={SendMessageIcon} resizeMode="contain" />
            </LinearGradient_primary>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
  function addFavouriteMessage(messageId) {
    setLocalSelectedMessages(pre => {
      if (Object.values(pre).includes(messageId))
        return pre.filter(data => data !== messageId);
      else
        return [...pre, messageId];
    });
  }

  const renderBubble = ({
    child,
    message,
    nextMessageInGroup,
  }

  ) => {
    return (

      <GestureHandlerRootView style={{ flex: 1 }}>
        <TapGestureHandler
          style={{ position: 'absolute', left: 0, padding: 20, backgroundColor: 'green' }}
          numberOfTaps={2}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.ACTIVE) {
              addFavouriteMessage(message.id)
            }
          }}
        >
          <View>
            <View
              style={{
                backgroundColor: user.id !== message.author.id ? COLOR.CHAT_BUBBLE_PINK_LIGHT : COLOR.PRIMARY,
                borderRadius: 20,
                borderBottomLeftRadius: !nextMessageInGroup && user.id === message.author.id ? 20 : 0,
                borderBottomRightRadius: !nextMessageInGroup && user.id !== message.author.id ? 20 : 0,
                overflow: 'hidden',

              }}
            >
              {child}
            </View>

            {user.id === message.author.id && localselectedMessages.includes(message.id) &&
              <Image source={ChatLikeIcon} style={[{
                position: 'absolute', bottom: 0,
                left: -4,
                bottom: -4,
                height: 20, width: 20
              }]} />}
            {user.id !== message.author.id && localselectedMessages.includes(message.id) &&
              <Image source={ChatLikeIcon} style={[{
                position: 'absolute', bottom: 0,
                right: -4,
                bottom: -4,
                height: 20, width: 20
              }]} />}
          </View>
        </TapGestureHandler>
      </GestureHandlerRootView>


    )
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#ffffff"} barStyle='dark-content' />
      <SafeAreaView style={{
        backgroundColor: 'white',
        paddingBottom: 40,
      }}>
        <View
          style={styles.headerView_container}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Image
              source={BackIcon}
              style={styles.goback_icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>

            <View style={styles.person_info_container}>
              <Image style={styles.person_img} source={PersonPlaceholder} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.person_name}>person_name</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.green_tick} />
                  <Title title={"Online"} style={styles.person_online_text} />
                </View>
              </View>

              <View style={styles.call_options_container}>
                <TouchableOpacity onPress={() => { alert("more") }} style={styles.call_option_image_container}><Image source={MenuIcon} style={[styles.call_option_image, { width: 4, tintColor: COLOR.BLACK80 }]} /></TouchableOpacity>
                <TouchableOpacity onPress={() => { alert("Video") }} style={styles.call_option_image_container}><Image source={VideoCallIcon} style={styles.call_option_image} /></TouchableOpacity>
                <TouchableOpacity onPress={() => { alert("Voice") }} style={styles.call_option_image_container}><Image source={VoiceCallIcon} style={styles.call_option_image} /></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Chat
        timeFormat='12:00'
        messages={messages}
        user={user}
        showUserAvatars={true}
        showStatus={true}
        customBottomComponent={renderInputView}
        renderBubble={renderBubble}
      />

    </SafeAreaProvider>
  )
}
const styles = StyleSheet.create({
  person_name: {
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.medium,
    color: COLOR.BLACK80
  },
  headerView_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%'
  },
  goback_icon: {
    height: 16,
    width: 16,
    marginLeft: 16
  },
  person_info_container: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center'
  },
  person_img: {
    height: 30,
    width: 30,
    marginLeft: 16,
    borderRadius: 20
  },
  green_tick: {
    padding: 3,
    marginRight: 3,
    borderRadius: 4,
    backgroundColor: '#05C46B',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  person_online_text:
  {
    fontSize: fontSize.small,
    fontFamily: fontFamily.Regular,
    color: COLOR.GRAY_700,
  },
  call_options_container:
  {
    borderColor: COLOR.GRAY_500,
    flex: 1,
    flexDirection: 'row-reverse',
    marginLeft: 8
  },
  call_option_image_container: {
    width: 36,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  call_option_image: {
    width: 20,
    height: 20
  },
  inputView: {
    height: 52,
    marginBottom: 16,
    marginHorizontal: 16,
    flexDirection: "row"
  },
  input_options_container:
  {
    borderRadius: 26,
    paddingLeft: 16,
    borderColor: COLOR.GRAY_500,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row-reverse',
    marginLeft: 8
  },
  input_options_image_container:
  {
    width: 36,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  send_btn_container: {
    width: 52,
    height: 52,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }


})
export default ConversationScreen