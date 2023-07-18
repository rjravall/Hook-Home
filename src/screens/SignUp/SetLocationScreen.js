import Title from '@/components/Title';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import React from 'react';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { COLOR } from '@/theme/theme';
import MapView, { } from 'react-native-maps';
import TextInputField from '@/components/TextInputField';
import { Button } from '@/components';
import Geolocation from 'react-native-geolocation-service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, StatusBar } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from './Map/API_KEY';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useRef } from 'react';
import { useEffect } from 'react';
import Geocoder from 'react-native-geocoding';
import { postUpdateProfile, setlocation } from '@/api';
import { SHOW_SUCCESS_TOAST, SHOW_TOAST } from '@/constants/ShowToast';


function SetLocationScreen(props) {
  Geocoder.init(API_KEY);
  const [address, setaddress] = useState()
  const _search = useRef();
  const [isSearch, setIsSearch] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)

  const [Latitude, setLatitude] = useState(20.5937)
  const [Longitude, setlogitude] = useState(78.9629);
  const _map = useRef();
  const s = {
    region: {
      latitude: Latitude,
      longitude: Longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    }
  }


  const [stat, setStat] = useState(s)

  const OnValueChanged = ({ region }) => {
    setStat({ region: region });

    setLatitude(parseFloat(JSON.stringify(region.latitude)));
    setlogitude(parseFloat(JSON.stringify(region.longitude)));

    //Revers  GeoCoder
    Geocoder.from({ lat: parseFloat(JSON.stringify(region.latitude)), lng: parseFloat(JSON.stringify(region.longitude)) })
      .then(response => {
        const address = response.results[0].formatted_address;
        setaddress(address);
      })
      .catch(error => console.warn(error));

    console.log(region);
  }



  //Current Location Fuction
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        _map.current.animateToRegion({
          ...stat.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        Geocoder.from({ lat: position.coords.latitude, lng: position.coords.longitude })
          .then(response => {
            const address = response.results[0].formatted_address;
            setaddress(address);
          })
          .catch(error => console.warn(error));
        setLatitude(position.coords.latitude)
        setlogitude(position.coords.longitude)
      },
      (error) => {
        console.warn("Error " + error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
    )
  }


  //location Permission  function
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        getCurrentLocation()
      } else {
        requestLocationPermission();
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  //API Calling
  async function getLocation() {
    const formData = new FormData();
    const params = {
      location:
        [
          latitude = Latitude,
          longitude = Longitude
        ]
    }
    setIsLoading(true)
    const result = await postUpdateProfile(params)
    setIsLoading(true)
    if (result.status) {
      if (result?.data?.success) {
        SHOW_SUCCESS_TOAST(result.data.message)
        if (props.route.params?.setting == undefined) {
          navigation.navigate(NAVIGATION.home)
        } else {
          navigation.pop(1);
        }

      } else {
        SHOW_TOAST(result?.data?.message)
      }
    } else {
      SHOW_TOAST(result.error)
    }

  }


  useEffect(() => {
    requestLocationPermission()
  }, [])

  return (
    <>
      <StatusBar hidden={true} />

      <View
        style={{ width: '100%', height: "50%" }}
      >
        <MapView
          ref={_map}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          initialRegion={stat.region}
          onRegionChangeComplete={(r) => { OnValueChanged({ region: r }) }}
          showsMyLocationButton={false}
          showsUserLocation={true}
        >
        </MapView>
        <View style={{ top: '50%', left: "50%", marginLeft: -15, marginTop: -27.5, position: 'absolute', }}>
          <Image
            source={{ uri: "https://icons.veryicon.com/png/System/Small%20%26%20Flat/map%20marker.png" }}
            style={{ height: 30, width: 30, }}
            resizeMode='cover'
          />
        </View>
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

      {
        isSearch ?
          <View style={{ width: '100%', minHeight: 40, position: 'absolute', }}>

            <GooglePlacesAutocomplete
              ref={_search}
              styles={{
                listView: {
                  marginTop: 10,
                  elevation: 10,
                  backgroundColor: '#fff',
                },
                separator: {
                  height: 1,
                  backgroundColor: '#23232310',
                },

                textInputContainer: {
                  width: '100%',
                  height: 40,
                  elevation: 20,
                  marginTop: 40,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                },
                container: {
                  padding: 10,
                }
              }}
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              fetchDetails={true} // you need this to fetch the details object onPress
              placeholder='Search'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setaddress(data.description.toString());
                setIsSearch(false);
                console.log(data, details);
                _map.current.animateToRegion({
                  ...stat.region,
                  latitude: parseFloat(JSON.stringify(details?.geometry?.location.lat)),
                  longitude: parseFloat(JSON.stringify(details?.geometry?.location.lng)),
                })
                setLatitude(parseFloat(JSON.stringify(details?.geometry?.location.lat)))
                setlogitude(parseFloat(JSON.stringify(details?.geometry?.location.lng)))
              }}
              query={{
                key: API_KEY,
                language: 'en',
              }}
            />
          </View>
          : null
      }
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white', }}
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingBottom: 30 }}>
            <Text
              onPress={() => navigation.navigate(NAVIGATION.home)}
              style={styles.skip_btn}>
              {strings.set_your_location.skip}
            </Text>
            <View style={styles.map_view_container} />
            <View style={styles.title_container}>
              <Title
                title={strings.set_your_location.title}
                style={{ fontFamily: fontFamily.Medium }}
              />
              <View style={{ flexDirection: 'row' }}>
                <Title
                  title={strings.set_your_location.subtitle}
                  style={styles.title}
                />
              </View>
              <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "#ffffff", elevation: 3, backgroundColor: "#fff", height: 85, alignItems: "center", justifyContent: "center", marginTop: 28 }}>

                <TouchableOpacity
                  onPress={() => {
                    setIsSearch(true);
                    setTimeout(() => {
                      _search.current.focus();
                    }, 1)
                  }}
                >
                  <Text
                    style={{ color: address ? "#000" : "#00000070", textAlign: 'justify', paddingHorizontal: 10, alignItems: "center" }}
                  >{address ? address : "Search..."}</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                onPress={() => {
                  setIsSearch(true);
                  setTimeout(() => {
                    _search.current.focus();
                  }, 1)
                }}
              >
                <Text style={{ marginTop: 20 }} >
                  {strings.set_your_location.edit_location}
                </Text>
              </TouchableOpacity> */}
              <View style={styles.subtitle}>
                <Button
                  title={strings.set_your_location.button}
                  flag={true}
                  // img={require('../../assets/location_icon/currentLocation.png')}
                  onPress={() => getLocation()}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  skip_btn: {
    alignSelf: 'flex-end',
    marginEnd: 16,
    marginTop: Platform.OS == 'android' ? 5 : 0,
    textDecorationLine: 'underline',
    color: COLOR.BLACK90,
  },
  title: {
    marginTop: 12,
    fontSize: fontSize.xmedium,
    fontFamily: fontFamily.Regular,
    color: COLOR.BLACK80,
  },
  subtitle: {
    flex: 1,
    marginTop: 68,
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  title_container: { marginTop: 24, paddingHorizontal: 16, flex: 1 },
  map_view_container: { marginTop: 12, height: 10, flex: 1 },
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
  },
  LocationBtnView: {
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
});

export default SetLocationScreen;
