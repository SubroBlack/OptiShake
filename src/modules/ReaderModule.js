/**
 * This Exposes the ReaderModule as a JS module
 */

 /**
  * import { NativeModules } from 'react-native';
  * const { ReaderModule } = NativeModules;
  * export default ReaderModule;
  */

  import KeyEvent from "react-native-keyevent";

  const scan = (cb) => {
    let chars = "";

    KeyEvent.onKeyUpListener((keyEvent) => {
      //console.log(" KeyCode: ", keyEvent.keyCode , "The pressed key is: ",keyEvent.pressedKey);
      if(keyEvent.keyCode === 66){
        cb(chars);
        chars = "";
      } else {
        chars = chars + keyEvent.pressedKey;
      }
    });
  };

  export default {scan};
