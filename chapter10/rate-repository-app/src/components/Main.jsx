import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact component={RepositoryList}/>
        <Route path="/sign-in" exact component={SignIn}/>
        <Route path="/create-review" exact component={CreateReview}/>
        <Route path="/sign-up" exact component={SignUp}/>
        <Route path="/review" exact component={Review}/>
        <Route path="/:id" exact component={SingleRepository}/>
      </Switch>
    </View>
  );
  
};

export default Main;
