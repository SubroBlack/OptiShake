import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import SerialPortAPI from 'react-native-serial-port-api';

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

const BastenGaoTrial = () => {
    const [check, setCheck] = useState(0);
    const [devices, setDevices] = useState('Empty');
    const [port, setPort] = useState('No Port');
    const [signal, setSignal] = useState('AA550401010207');
    const [end, setEnd] = useState('ttyS1');
    const [received, setReceived] = useState('');


    // checkDevices
    const checkDevices = async () => {
        setCheck(check + 1);
        console.log('Checking....');
        SerialPortAPI.devicePaths((result) => {
            setDevices(result);
            console.log('Found Devices: ', result);
        });
        console.log('Checked!');
    };

    // Open the Ports
    const openPort = async () => {
        console.log('The endpoint to be opened: ', end);
        setCheck(check + 1);
        const serialport = await SerialPortAPI.open(`/dev/${end}`, {
            baudRate: 9600,
            parity: 0,
            databits: 8,
            stopBits: 1,
        });
        setPort(serialport);
        console.log('You opened a Port: ', serialport);
    };

    // Listening to the port
    // subscribe received data
    const checkReceive = () => {
        console.log('Data checking from the port ', port);
        if (port !== 'No Port' && port) {
            const sub = port.onReceived((buff) => {
                setReceived(buff.toString('hex').toUpperCase());
                console.log(
                    'Return data from port ',
                    buff.toString('hex').toUpperCase(),
                );
            });
        }
    };

    // Function to Send the Data
    const sendData = async () => {
        console.log('The end ', end, 'and the data send ', signal);
        setCheck(check + 1);
        await port.send(signal);
    };

    // Close port 
    const close = () => {
    port.close();
    }

    return (
        <View>
            <Text>BastenGao react native SerialPort</Text>
            <Text>Looking for Any Available Ports</Text>
            <Text>Button Clicked {check} times</Text>

            <Button label="Check for Devices" handler={checkDevices} />
            <Text>Found Devices {devices} </Text>

            <Text>The End Point to Check/Open</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEnd(text)}
                value={end}
            />

            <Text>Port to be opened: {end}</Text>
            <Button label="Open Port" handler={openPort} />

            <Text>Opened Port: //port from state//</Text>
            <Button label="Check recevied Data" handler={checkReceive} />

            <Text>The data to be Sent</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setSignal(text)}
                value={signal}
            />
            <Button label="Send data" handler={sendData} />
            <Button label="Close Port" handler={close} />
            <Text>Received Data: {received}</Text>
        </View>
    );
};

export default BastenGaoTrial;
