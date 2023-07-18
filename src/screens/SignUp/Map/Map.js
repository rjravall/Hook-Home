import { View, Text, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState } from 'react'
import { API_KEY } from './API_KEY';

const Map = ({ onPress, isSearchFocus }) => {
    const [Latitude, setLatitude] = useState(20.5937)
    const [Longitude, setlogitude] = useState(78.9629);
    const _map = useRef();
    const _search = useRef();
    const s = {
        region: {
            latitude: Latitude,
            longitude: Longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
    }
    const [stat, setStat] = useState(s)

    const OnValueChanged = ({ region }) => {
        setStat({ region: region });

        setLatitude(parseFloat(JSON.stringify(region.latitude)));
        setlogitude(parseFloat(JSON.stringify(region.longitude)));

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
    useEffect(() => {
        requestLocationPermission()
    }, [])
    return (
        <>
            <View
                style={{ width: '100%', height: "50%" }}
            >
                <MapView
                    ref={_map}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                    initialRegion={stat.region}
                    onRegionChangeComplete={(r) => { OnValueChanged({ region: r }) }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                >
                    {/* <Marker
                        coordinate={{ latitude: Latitude, longitude: Longitude }}
                    /> */}

                </MapView>
                <View style={{ top: '50%', left: "50%", marginLeft: -15, marginTop: -27.5, position: 'absolute', }}>
                    <Image
                        source={{ uri: "https://icons.veryicon.com/png/System/Small%20%26%20Flat/map%20marker.png" }}
                        style={{ height: 30, width: 30, }}
                        resizeMode='cover'
                    />
                </View>
            </View>
            {/* <View style={{ width: '100%', minHeight: 40, position: 'absolute', }}>

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
                            elevation: 10,
                            backgroundColor: '#fff',
                        },
                        container: {
                            padding: 10,
                        }
                    }}
                    placeholder='Search'
                    onPress={onPress}
                    query={{
                        key: API_KEY,
                        language: 'en',
                    }}
                />
            </View> */}

        </>
    )
}

export default Map