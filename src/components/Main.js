import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform, Text } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
  NativeRouter,
  Route,
  Redirect
} from 'react-router-native';

import {openPort} from "../reducers/port";
import { listenNew } from '../reducers/response';

import ReaderModule from "../modules/ReaderModule";

import DrinksList from './DrinksList';
import AppBar from './AppBar';
import theme from '../theme';
import AuthPage from './AuthPage';
import ScanShaker from './ScanShaker';
import Register from './Register';
import Subscribe from './Subscribe';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { fetchUser } from '../reducers/user';

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

  const [key, setKey] = useState();

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
  console.log("Main Port", port ? port.path : port);

  // Listen to the Port
  useEffect(() => {
    port ? dispatch(listenNew(port)): null;
  }, [port]);

  // Scan RFID card Test Function
  const feed = (data) => {
    setKey(data);
    dispatch(fetchUser(data));
    console.log("The Scan Feed func from Main: ", typeof data, data);
  }
  ReaderModule.scan(feed);


  return (
    <View style={styles.container}>
      <NativeRouter>
        
        <AppBar />
      
        <Route path="/" exact>
          <DrinksList />
        </Route>
        <Route path="/scan" exact>
          <ScanShaker />
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
        <Redirect to="/" />
      </NativeRouter>
      <Text>
        Latest Reply from the Machine: {response}
      </Text>
      <Text>
        Latest Drink Selected: {drink ? drink.name : null}
      </Text>
      <Text>
        Current User: {user ? user.fullName : null}
      </Text>
      <Text>
        Scanned Key: {key}
      </Text>
    </View>
  );
};

export default Main;
