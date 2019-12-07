import React from 'react';
import Map from './components/Map';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['componentWillMount']);

const App = () => {
  return <Map />;
};

export default App;
