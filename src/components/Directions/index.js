import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import {apiKey} from '../../utils';

const GOOGLE_MAPS_APIKEY = apiKey();

const Directions = ({destination, origin, onReady}) => {
  return (
    <MapViewDirections
      apikey={GOOGLE_MAPS_APIKEY}
      destination={destination}
      origin={origin}
      onReady={onReady}
      strokeWidth={3}
      strokeColor="#222"
    />
  );
};

export default Directions;
