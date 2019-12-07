import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {Platform, StyleSheet} from 'react-native';
import {apiKey} from '../../utils';

const GOOGLE_MAPS_APIKEY = apiKey();

const Search = ({onLocationSelected}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      placeholderTextColor="#333"
      onPress={onLocationSelected}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'pt',
      }}
      textInputProps={{
        onFocus: () => {
          setSearchFocused(true);
        },
        onBlur: () => {
          setSearchFocused(false);
        },
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      listViewDisplayed={searchFocused}
      fetchDetails
      enablePoweredByContainer={false}
      styles={styles}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.select({ios: 60, android: 40}),
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    height: 54,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 54,
    margin: 0,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 15,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 20,
    height: 58,
  },
});

export default Search;
