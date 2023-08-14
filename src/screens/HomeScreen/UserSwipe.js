import { getSwipeUser } from '@/api/user';
import {
  CloseIcon,
  GalleryIcon,
  GreenTickIcon,
  InfoIcon,
  BigLikeIcon,
  SwipeIcon,
} from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import { fontFamily, fontSize, width } from '@/Utils/Constant';
import React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Value } from 'react-native-reanimated';



const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class UserSwipe extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.users);
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      users: props.users,
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
  }
  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.SwipeCard(gestureState)
      },
    });
  }

  autoRight = () => {
    Animated.spring(this.position, {
      toValue: { x: SCREEN_WIDTH + 100, y: -100 },
      useNativeDriver: true,
    }).start(() => {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        this.position.setValue({ x: 0, y: 0 });
      });
    });
  };

  autoLeft = () => {
    Animated.spring(this.position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: -100 },
      useNativeDriver: true,
    }).start(() => {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        this.position.setValue({ x: 0, y: 0 });
      });
    });
  };

  SwipeCard = async (gestureState) => {
    if (gestureState.dx > 120) {
      data = "like"
      console.log(data)
      const limitOver = await this.userswipe(data)
      if (limitOver) {
        Animated.spring(this.position, {
          toValue: { x: SCREEN_WIDTH + 200, y: 0 },
          useNativeDriver: true,
        }).start(() => {
          this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 });
          });
          this.props.onRemove();
        });
      } else {
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start(
          //Pop Up
        );
      }

    } else if (gestureState.dx < -120) {
      data = "dislike"
      console.log(data)
      this.userswipe(data)
      const limitOver = await this.userswipe(data)
      // if (limitOver) {
      Animated.spring(this.position, {
        toValue: { x: -SCREEN_WIDTH - 200, y: 0 },
        useNativeDriver: true,
      }).start(() => {
        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
          this.position.setValue({ x: 0, y: 0 });
        });
        this.props.onRemove();
      });
      // } else {
      //   Animated.spring(this.position, {
      //     toValue: { x: 0, y: 0 },
      //     friction: 4,
      //     useNativeDriver: true,
      //   }).start();
      // }
    } else {
      Animated.spring(this.position, {
        toValue: { x: 0, y: 0 },
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }


  userswipe = async (data) => {
    swipeuserid = this.state.users[this.state.currentIndex]._id
    params = {
      swipeUserId: swipeuserid,
      type: data
    }
    const result = await getSwipeUser(params)
    if (result.status) {
      if (result?.data?.success) {
        console.log("Result.ststus", result.status)
      }
    } else {
      console.log("Result.ststus", result.status)
    }
    return result.status
  }


  renderUsers = () => {
    return this.state.users
      .map((item, i) => {
        // console.log(item.location);

        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.i}
              style={[
                this.rotateAndTranslate,
                {
                  flex: 1,
                },
              ]}>
              {this.renderUserCard(item)}
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.i}
              style={[
                {
                  opacity: this.nextCardOpacity,
                  transform: [{ scale: this.nextCardScale }],
                },
                CommonStyle.absoluteView,
              ]}>
              {this.renderUserCard(item)}
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.users && this.renderUsers()}
        {this.state.currentIndex < this.state.users.length &&
          <View style={style.actionWrapper}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.autoLeft();
                }}
                style={[
                  style.flexCenterV,
                  {
                    alignItems: 'flex-end',
                  },
                ]}>
                <View
                  style={[style.actionButtonContainer, style.closeIconContainer]}>
                  <Image source={CloseIcon} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.matchClick();
                }}
                style={style.flexCenterV}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View
                    style={[
                      style.actionButtonContainer,
                      style.likeIconContainer,
                    ]}>
                    <Image source={BigLikeIcon} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.autoRight();
                }}
                style={[
                  style.flexCenterV,
                  {
                    alignItems: 'flex-start',
                  },
                ]}>
                <View
                  style={[style.actionButtonContainer, style.swipeIconContainer]}>
                  <Image source={SwipeIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>

    );
  }

  renderUserCard(user) {
    // console.log("********************************************", user.userPhotos.publicPhotos[0])
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View style={style.cardContainer}>
          {
            user.userPhotos?.publicPhotos[0] != undefined ?
              <Image source={{ uri: user.userPhotos.publicPhotos[0] }} style={style.personImage} />
              : null}

          {/* <View style={style.cardTopWrapper}>
            <View style={style.imageCountContainer}>
              <Image source={GalleryIcon} />
              <Text style={style.imageCountText}>2/5</Text>
            </View>
          </View> */}
          <View style={style.cardBottomWrapper}>
            <LinearGradient
              colors={['transparent', 'black']}
              style={style.cardGradientView}
              angle={180.0}
              useAngle={true}
            />
            <View style={style.userInfoWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={style.userNameContainer}>
                  <Text numberOfLines={1} style={style.userNameText}>
                    {user.firstName} {user.lastName}, {user.age ? user.age : "20"}
                  </Text>
                  {user.greenTick && (
                    <Image
                      style={style.greenTickImage}
                      source={GreenTickIcon}
                    />
                  )}
                </View>
                <View
                  style={[
                    style.flexCenterV,
                    {
                      alignItems: 'flex-end',
                    },
                  ]}>
                  <TouchableOpacity
                    style={style.infoIconContainer}
                    onPress={() => {
                      this.props.infoClick(user);
                      // this.props.navigation.navigate(
                      //   NAVIGATION.person_basic_info,
                      // );
                    }}>
                    <Image source={InfoIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[style.placeDistanceText, { flexDirection: 'row' }]}>
                  {user.location}
                </Text>
                <View style={style.placeDistanceDot} />
                <Text style={style.placeDistanceText}>
                  {user.distance} Away
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  placeDistanceDot: {
    padding: 2,
    marginHorizontal: 7,
    borderRadius: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  placeDistanceText: {
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.xmedium,
    color: 'white',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#393939',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenTickImage: {
    marginLeft: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userNameText: {
    fontFamily: fontFamily.SemiBold,
    fontSize: fontSize.xlarge,
    color: 'white',
  },
  userNameContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 30,
  },
  userInfoWrapper: {
    position: 'absolute',
    width: '92%',
    height: 110,
    marginHorizontal: 16,
    bottom: 0,
  },
  cardGradientView: {
    flex: 1,
    position: 'absolute',
    opacity: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  cardBottomWrapper: {
    position: 'absolute',
    width: '100%',
    height: '76%',
    bottom: 0,
  },
  imageCountText: {
    marginLeft: 4,
    fontFamily: fontFamily.Regular,
    fontSize: fontSize.xmedium,
    color: 'white',
  },
  imageCountContainer: {
    width: 64,
    height: 40,
    backgroundColor: '#393939',
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    margin: 16,
  },
  cardTopWrapper: {
    position: 'absolute',
    height: '24%',
    width: '100%',
    top: 0,
    flexDirection: 'row-reverse',
  },
  personImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  cardContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 46,
    borderRadius: 24,
    overflow: 'hidden',
  },
  closeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  swipeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  likeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  actionWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 16,
    width: width - 32,
  },
  actionButtonContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'A0929A',
    shadowOpacity: 0.25,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 20 },
    borderWidth: 1,
    borderColor: '#EFEFEF',
    justifyContent: 'center',
  },
  flexCenterV: {
    flex: 1,
    justifyContent: 'center',
  },
});
