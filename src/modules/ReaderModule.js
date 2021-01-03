/**
 * This Exposes the ReaderModule as a JS module
 */

import { NativeModules } from 'react-native';
const { ReaderModule } = NativeModules;
console.log("The Reader Module: ", ReaderModule);
export default ReaderModule;
