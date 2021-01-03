import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet  } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#24292e',
    paddingBottom: 10,
  },
  baseText: {
    color: 'white'
  },
});

const AppBar = () => {
  return <View style={styles.container}>{
    <TouchableWithoutFeedback>
      <View><Text style={styles.baseText}>Repositories</Text></View>
    </TouchableWithoutFeedback>
  }</View>;
  
};

export default AppBar;
