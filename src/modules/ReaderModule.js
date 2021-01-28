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

    KeyEvent.onKeyDownListener((keyEvent) => {
      if(keyEvent.keyCode === 66){
        cb(chars);
        return chars;
      }
      chars = chars + keyEvent.pressedKey;
    });
  };

  export default {scan};
