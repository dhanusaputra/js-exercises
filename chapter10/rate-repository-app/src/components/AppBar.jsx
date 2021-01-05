import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  baseText: {
    color: 'white'
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

const AppBar = () => {
  return ( 
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.button}>
          <Text style={styles.baseText}>Sign in</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.button}>
          <Text style={styles.baseText}>Repositories</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ); 
};

export default AppBar;
