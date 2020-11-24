/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import {Provider} from "react-redux";
import store from "./src/store";
import Main from './src/components/Main';
import DummyShit from "./src/components/DummyShit";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Main />
        <DummyShit />
      </Provider>
    </>
  );
};

export default App;
