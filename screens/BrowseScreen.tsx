import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import * as Device from 'expo-device';
import * as Location from 'expo-location';


import colors from '../configs/colors';

const BrowseScreen = () => {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const [longitude, setLongitude ] = useState(0);
  const [latitude, setLatitude ] = useState(0);


  const initialRegion = {
    latitude: latitude,                     
    longitude: longitude, 
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }

  const initialCoordinate = {
      latitude : latitude,                     
      longitude: longitude, 
    }


  useEffect(() => {
      (async () => {
        if (Platform.OS === 'android' && !Device.isDevice) {
          setErrorMsg(
            'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
          );
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log("novo ", location);
        setLongitude(location.coords.longitude);
        setLatitude(location.coords.latitude);
        setLocation(location);
      })();
    }, []);
  



    return (
      <>
        <Screen style={tailwind`flex-1 bg-white`}>
          <View style={styles.container}>
           <MapView 
             provider = { PROVIDER_GOOGLE }
             region={initialRegion}
             style={styles.map} />
        </View>
            
        </Screen>
    </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
    input: {
        borderColor: colors.medium,
        borderWidth: 1,
    },
})

export default BrowseScreen;
