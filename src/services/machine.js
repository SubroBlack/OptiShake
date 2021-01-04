import SerialPortAPI from 'react-native-serial-port-api';

// Find the Devices 
const devices = (callBack) => {
  SerialPortAPI.devicePaths((result) => {
    console.log("The result: ", result);
    callBack(result);
  });
}

// Function to Open a serial port
const openPort = async (port) => {
  try {
    const serialPort = await SerialPortAPI.open(`/dev/${port}`, {
      baudRate: 9600,
      parity: 0,
      databits: 8,
      stopBits: 1,
  });
  return serialPort; 
  } catch (error) {
    console.log("Machine Service openPort Error: ", error);
    return null;
  }
};

// Listen to an open port for received data
const listen = (port, callBack) => {
  try {
    let signal = null;
    const sub = port.onReceived(buff => {
      signal = buff.toString('hex').toUpperCase();
      console.log(' Machine Service Subscription: ', signal);
      callBack(signal);
    });
    return {sub, signal};
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function to Send Commands to the Machine
const command = async (port, code) => {
  try {
    console.log('The end ', port.path, 'and the data send ', code);
    const res = await port.send(code);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// close the port 
const closePort = (port) => {
  port.close();
}

export default {devices, openPort, listen, command, closePort};
