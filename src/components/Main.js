import React, {useEffect} from 'react';
import {StyleSheet, View, Platform, Text } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
  NativeRouter,
  Route,
  Redirect
} from 'react-router-native';

import {openPort} from "../reducers/port";
import { listenNew } from '../reducers/response';

import DrinksList from './DrinksList';
import AppBar from './AppBar';
import theme from '../theme';
import BastenGaoTrial from './BastenGaoTrial';
import Settings from "./Settings";
import AuthPage from './AuthPage';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.baseColor,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.iOS,
      default: theme.fonts.main,
    }),
  },
});

const Main = () => {

// States
const response = useSelector(state => state.response);
const drink = useSelector(state => state.drink);
const user = useSelector(state => state.user);

// React.Redux Hooks
const dispatch = useDispatch();

// Make the Device Ready with port
useEffect(() => {
  dispatch(openPort());
}, [])

// Setting the Port 
const port = useSelector(state => state.port);
console.log("Main Port", port);

// Listen to the Port
useEffect(() => {
  port ? dispatch(listenNew(port)): null;
}, [port]);

  return (
    <View style={styles.container}>
      <NativeRouter>
        <AppBar />  
        <Route path="/" exact>
          <DrinksList />
        </Route>
        <Route path="/bastengao" exact>
          <BastenGaoTrial />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </NativeRouter>
      <Text>
        Latest Reply from the Machine: {response}
      </Text>
      <Text>
        Latest Drink Selected: {drink}
      </Text>
      <Text>
        Current User: {user ? user.name : null}
      </Text>
    </View>
  );
};

export default Main;
