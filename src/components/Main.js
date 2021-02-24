import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform, Text, Pressable } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
  NativeRouter,
  Route,
  Redirect
} from 'react-router-native';
import {useHistory} from "react-router-dom";

import {closePort, openPort} from "../reducers/port";
import { listenNew } from '../reducers/response';

import ReaderModule from "../modules/ReaderModule";

import DrinksList from './DrinksList';
import AppBar from './AppBar';
import theme from '../theme';
import AuthPage from './AuthPage';
import Register from './Register';
import Subscribe from './Subscribe';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { fetchUser } from '../reducers/user';
import FormikPhoneInput from './FormikPhoneInput';
import UserGreet from './UserGreet';
import { setKey } from '../reducers/key';

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
  body: {
    flexGrow: 1,
    flexShrink: 1,
    padding: theme.padding.medium,
  }
});

const Main = () => {

  // States
  const response = useSelector(state => state.response);
  const drink = useSelector(state => state.drink);
  const user = useSelector(state => state.user);
  const key = useSelector(state => state.key);

  // React.Redux Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Make the Device Ready with port
  useEffect(() => {
    dispatch(openPort());
  }, [])

  // Setting the Port
  const port = useSelector(state => state.port);
  //console.log("Main Port", port ? port.path : port);

  // Listen to the Port
  useEffect(() => {
    port ? dispatch(listenNew(port)): null;
    return port ? () => {dispatch(closePort(port))} : undefined;
  }, [port]);

  // Scan RFID card Test Function
  const feed = (data) => {
    dispatch(setKey(data));
    dispatch(fetchUser(data));
  }

  ReaderModule.scan(feed);

  return (
    <View style={styles.container}>
      <NativeRouter>
        
        <AppBar />        

        <View style={styles.body}>

          <UserGreet />
        
          <Route path="/" exact>
            <DrinksList />
          </Route>
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/subscribe" exact>
            <Subscribe />
          </Route>
          <Route path="/signUp" exact>
            <SignUp />
          </Route>
          <Route path="/signIn" exact>
            <SignIn />
          </Route>
          <Route path="/regform" exact>
            <FormikPhoneInput name="phone" placeHolder="You Phone Number" />
          </Route>
          <Redirect to="/" />

        </View>
      </NativeRouter>
      
      <Text>
        Latest Reply from the Machine: {response}
      </Text>
      <Text>
        Latest Drink Selected: {drink ? drink.name : null}
      </Text>
      <Text>
        User: {user ? user.fullName : null}
      </Text>
      <Text>
        Key: {key}
      </Text>
    </View>
  );
};

export default Main;
