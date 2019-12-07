import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {View, StyleSheet, PermissionsAndroid, Text, Image} from 'react-native';
import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';
import Geocoder from 'react-native-geocoding';
import {getPixelsSize, apiKey} from '../../utils';

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';

navigator.geolocation = require('@react-native-community/geolocation');

const GOOGLE_MAPS_APIKEY = apiKey();
Geocoder.init(GOOGLE_MAPS_APIKEY);

const Map = () => {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);

  async function requestFineLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission',
          message: 'Access you location needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the gps');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function requestCoarseLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location permission',
          message: 'Access you location needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the coarse Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function handleLocationSelected(data, {geometry}) {
    console.log('handleLocationSelected');
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  function handleBack() {
    setDestination(null);
  }

  useEffect(() => {
    requestFineLocationPermission();
    requestCoarseLocationPermission();
    //console.log(navigator.geolocation);
    async function loadUserLocation() {
      navigator.geolocation.getCurrentPosition(
        async ({coords: {latitude, longitude}}) => {
          const response = await Geocoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(','));
          setLocation(location);
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
        },
        err => {
          console.log('err');
          console.log(err);
        },
        {
          timeout: 2000,
          enableHighAccuracy: false,
          //maximumAge: 1000,
        },
      );
    }
    loadUserLocation();
  }, []);
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        //onRegionChange={region => this.onRegionChange(region)}
        showsUserLocation={true}
        loadingEnabled
        ref={el => (this.mapView = el)}>
        {destination && (
          <>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                setDuration(Math.floor(result.duration));
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelsSize(50),
                    left: getPixelsSize(50),
                    top: getPixelsSize(50),
                    bottom: getPixelsSize(350),
                  },
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{x: 0, y: 0}}
              image={markerImage}>
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>
            <Marker coordinate={region} anchor={{x: 0, y: 0}}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </MapView>
      {destination ? (
        <>
          <Back
            onPress={() => {
              handleBack();
            }}>
            <Image source={backImage} />
          </Back>
          <Details />
        </>
      ) : (
        <Search
          onLocationSelected={(data, geometry) =>
            handleLocationSelected(data, geometry)
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  /*map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },*/
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
