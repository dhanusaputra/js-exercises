import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
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
      <ScrollView horizontal>
        <AppBarTab link="/sign-in" text="Sign in" />
        <AppBarTab link="/" text="Repositories" />
      </ScrollView>
    </View>
  ); 
};

const AppBarTab = ( { link, text } ) => {
  return(
    <Link to={link} component={TouchableOpacity}>
        <View style={styles.button}>
          <Text style={styles.baseText}>{text}</Text>
        </View>
    </Link>
  );
};

export default AppBar;
