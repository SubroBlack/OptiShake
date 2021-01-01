import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import machine from "../services/machine";

import Button from './Button';
import Text from './Text';

import theme from '../theme';


const styles = StyleSheet.create({
    container: {},
    button: {},
    input: {
        padding: theme.padding.medium,
        marginBottom: theme.margin.medium,
        backgroundColor: theme.backgroundColors.light,
        borderStyle: 'solid',
        borderWidth: theme.borders.thin,
        borderColor: theme.backgroundColors.dark,
        borderRadius: 5,
    },
});

const Settings = () => {
  // States
  const [response, setResponse] = useState("");
  const [signal, setSignal] = useState('AA550401110116');

  // Get the Port
  const port = useSelector(state => state.port);

    // checkDevices
    const checkDevices = () => {
      machine.devices(setDevices);
    };

    // Function to Send the Data
    const sendData = async () => {
        await port.send(signal);
    };

    return (
        <View>
            <Text>Settings</Text>

            <Text>The data to be Sent</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setSignal(text)}
                value={signal}
            />
            <Button label="Send data" handler={sendData} />

            <Text>Received Data: {response}</Text>
        </View>
    );
};

export default Settings;
