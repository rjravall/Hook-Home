import { FilterIcon, SearchIcon } from '@/assets';
import ScreenName from '@/components/ScreenName';
import { strings } from '@/localization';
import { COLOR } from '@/theme/theme';
import { fontSize } from '@/Utils/Constant';
import { Input, NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useState } from 'react';
import { useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { suggestedUser } from '@/api/user';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomeMarkerShape from './CustomeMarkerShape';
import ShapedImage from './ShapedImage';


const width = Dimensions.get('window').width;

function ExploreScreen(props) {
  const styles = StyleSheet.create({
    search_view_container: {
      marginTop: 10,
      flexDirection: 'row',
      width: width,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    filter_img: {
      height: 48,
      width: 48,
      backgroundColor: '#fff',
      borderRadius: 48,
      elevation: 30,
    },
    search_bar_container: {
      width: width * 0.7,
      height: 48,
    },
    search_img: {
      height: 16,
      width: 16,
      marginLeft: 16,
      marginVertical: 10,
    },
    LocationBtnView: {
      position: 'absolute',
      bottom: 50,
      right: 10,
    },
    LocationBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      position: 'absolute',
      elevation: 5,
      width: 40,
      aspectRatio: 1 / 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      borderRadius: 15,
      alignSelf: 'flex-end',
    }
  });

  const [Latitude, setLatitude] = useState(20.5937)
  const [Longitude, setlogitude] = useState(78.9629);
  const [IsLoading, setIsLoading] = useState()
  const [items, setitems] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const _map = useRef();
  const s = {
    region: {
      latitude: Latitude,
      longitude: Longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }
  }
  const [stat, setStat] = useState(s)

  // console.log("Items.......................", items)

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        _map.current.animateToRegion({
          ...stat.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        getSuggestedUser(position.coords.latitude, position.coords.longitude)

        setLatitude(position.coords.latitude)
        setlogitude(position.coords.longitude)
      },
      (error) => {
        console.warn("Error " + error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
    )
  }
  async function getSuggestedUser(lat, lan) {
    const params = {
      "location": [lat, lan],
      "distanceRange": 1000,
      // "mode": { mode }
    }
    setIsLoading(true)
    const result = await suggestedUser(params)
    let list = [];
    if (result.status) {
      if (result?.data?.success) {
        SHOW_SUCCESS_TOAST(result.data.message)
        console.log(">>>>>>>>>>>>>>>>>>>>>>API Calling<<<<<<<<<<<<<<<<<<<<<<<<<<<")

        let p2 = result.data.data.suggestions
        console.log("P2======================", p2)
        setitems(p2)
      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }
  }

  useEffect(() => {

    getCurrentLocation()

  }, [navigation, isFocused])

  return (
    <NativeBaseProvider>

      <View style={{ flex: 1 }}>

        <MapView
          style={{ height: "100%", width: "100%", }}
          ref={_map}
          initialRegion={stat.region}
          showsMyLocationButton={false}
          showsUserLocation={true}
        >
          <Circle
            center={{ latitude: Latitude, longitude: Longitude }}
            radius={1000} // in meters
            strokeWidth={0}
            strokeColor="rgba(255, 0, 0, 0.5)"
            fillColor="rgba(255, 0, 0, 0.1)"
          />
          {
            items.map((item, i) => {
              return (
                <Marker
                  key={i}
                  coordinate={{ latitude: item.location.coordinates[0], longitude: item.location.coordinates[1] }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 50,
                    height: 56,
                  }}
                >
                  <CustomeMarkerShape
                    source={item.userPhotos.publicPhotos[0]} />
                </Marker>

              )
            })
          }
        </MapView>

        < View style={styles.LocationBtnView}>
          <TouchableOpacity
            style={styles.LocationBtn}
            onPress={() => { getCurrentLocation() }}
          >
            <Image
              source={require('../../assets/location_icon/currentLocation.png')}
              style={{ height: 40, width: 40, }}
              resizeMode='cover'
            />
            {/* <MaterialIcons name='location-searching' size={25} color={'#000'} /> */}
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={{ position: 'absolute' }}>
        <StatusBar hidden={true} />
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.05)',]}
          useAngle angle={180}
          style={{ width: '100%', paddingTop: 30, height: width / 2 }}
        >
          <ScreenName name={strings.explore_screen.title} />
          <View style={styles.search_view_container}>
            <View style={styles.search_bar_container}>
              <Input
                // style={{ height: "100%", width: '50%' }}
                variant="rounded"
                focusOutlineColor={COLOR.GRAY_400}
                backgroundColor={COLOR.WHITE}
                placeholderTextColor={COLOR.GRAY_800}
                placeholder={strings.explore_screen.search}
                fontSize={fontSize.xmedium}
                InputLeftElement={
                  <Image source={SearchIcon} style={styles.search_img} />
                }
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                elevation: 50,
                borderRadius: 48,
              }}
              onPress={() => alert('filterView Pressed')}>
              <Image source={FilterIcon} style={styles.filter_img} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default ExploreScreen;
