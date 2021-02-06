import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/react-hooks';

import AuthStorageContext from '../contexts/AuthStorageContext';

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
        <AppBarTab link="/create-review" text="Create a review" />
        <AppBarTab link="/sign-up" text="Sign up"/>
        <SignOutTab />
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

const SignOutTab = () => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();
  const history = useHistory();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
    history.push('/sign-in');
  }

  return(
    <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.button}>
          <Text style={styles.baseText}>Sign out</Text>
        </View>
    </TouchableOpacity>
  );
}

export default AppBar;
