package com.optishake;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import Lib.LCReader.T6.function_T6;

public class ReaderModule extends ReactContextBaseJavaModule {

    private function_T6 call_contactLess;

    ReaderModule(ReactApplicationContext context) {
        super (context);
        //onCreate
        call_contactLess = new function_T6(context);
        call_contactLess.SetTransPara(0x20, 1137, 41234);
    }

    @Override
    public String getName() {
        return "ReaderModule";
    }

    /*
    // Test the M1 Card connected via USB
    @ReactMethod
    public int DoOneTest() {
        int testRel = 0;
        testRel = TestM1();
        Log.d("ReaderModule", "DoOneTest: ");
        return(testRel);
    }
     */

    // Function to Test the M1 Radio Card
    @ReactMethod
    public void TestM1(Promise promise) {
        // TODO Auto-generated method stub
        int result = 0, hdev = 1;
        char[] pModVer = new char[512];
        char[] hexCard = new char[128];// Card SN in HEX type
        char[] strCard = new char[128];// Card SN in HEX string type
        long sn;// Card SN in integer type
        long _sn;// Card SN in integer type (Reverse)
        char[] rv_hexCard = new char[128];// Card SN in HEX type(Reverse)
        char[] rv_strCard = new char[128];// Card SN in HEX string type (Reverse)

        short tblk = 24;
        short val_blk = 25;
        short chineseBlk = 26;// Chinese test data block
        int[] pCurVal = new int[1];
        short tSec = (short) (tblk / 4);
        short keymode = 0;
        char[] defKey = new char[] { 0xff, 0xff, 0xff, 0xff, 0xff, 0xff };// Default key when card not be writen
        char[] newKey = { 0xff, 0xff, 0xff, 0xff, 0xff, 0xff };
        char[] strNewkey = new char[255];
        char[] tWrite = { 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0xd, 0xe, 0xf };
        char[] strHexWrite = new char[100];
        char[] strHexRead = new char[100];
        char[] strCHNdata_in = new char[100];// Chinese counterpart  char
        byte[] bytesCHNdata_in = new byte[100];// The data actually written to the card
        byte[] bytesCHNdata_out = new byte[100];// Actual data read
        char[] strCHNdata_out = new char[100];
        String strTmp = " ";
        char[] strKeyb = ("ffffffffffff").toCharArray();
        char[] strCtrlW = ("ff078069").toCharArray();

        long startTime = 0;
        long timePass = 0;
        int i;
        int nTest;
        int linkedReaderNum = 0;
        int[] hDevArr = new int[4];

        // Array of Info to be sent back
        WritableMap cardData = new WritableNativeMap();

        // Connection port
        do {
            hdev = call_contactLess.fw_init_ex(2, null, 0);
            Log.i("DEV__", "Value of HDEV: " + String.valueOf(hdev));


            if (hdev != -1) {
                hDevArr[linkedReaderNum] = hdev;
                linkedReaderNum++;
                break;
            }
        } while (hdev != -1);

        if (linkedReaderNum == 0)// NO Reader mounted
        {
            Log.i("DEV__", "_Link reader failed ");
            //return result;
            cardData.putString("result", "failure");
            cardData.putString("status", "no Reader Found");
            promise.resolve(cardData);

        }


        // Successfully connected to the port
        for (nTest = 0; nTest < linkedReaderNum; nTest++) {
            hdev = hDevArr[nTest];

            Log.i("DEV__", "Operating Reader: " + String.valueOf(hdev) + "---------------");

            startTime = System.currentTimeMillis();// Save the start time for test

            // Get the hardware version number once
            // try to get module version
            result = call_contactLess.fw_getver(hdev, pModVer);

            if (0 == result) {

                Log.i("DEV__", "Module Version: " + String.valueOf(pModVer));

                call_contactLess.fw_reset(hdev, 10);


                // Get card number UID
                result = call_contactLess.fw_card_str(hdev, (short) 1, strCard);

                if (0 == result) {
                    Log.i("DEV__", "_card:ok ");
                    call_contactLess.a_hex(hexCard, strCard, 4);
                    sn = ((long) (hexCard[0]) << 24) + ((long) (hexCard[1]) << 16) + ((long) (hexCard[2]) << 8)
                            + (long) (hexCard[3]);
                    for (i = 0; i < 4; i++)
                        rv_hexCard[i] = hexCard[3 - i];
                    _sn = ((long) (rv_hexCard[0]) << 24) + ((long) (rv_hexCard[1]) << 16) + ((long) (rv_hexCard[2]) << 8)
                            + (long) (rv_hexCard[3]);
                    call_contactLess.hex_a(rv_strCard, rv_hexCard, 8);
                    cardData.putString("cardNum", String.format("%010d", sn));
                    cardData.putString("cardNumRev", String.format("%010d", _sn));
                    cardData.putString("cardNumHex", String.valueOf(strCard));
                    cardData.putString("cardNumHexRev", String.valueOf(rv_strCard));

                    // Card verification
                    // authen
                    result = call_contactLess.fw_authentication_pass(hdev, keymode, tSec, defKey);
                    // result = call_contactLess.fw_authentication(hdev, keymode, tSec);

                    if (0 == result) {
                        Log.i("DEV__", "_authen:ok ");
                        cardData.putString("authen", "ok");

                        // write
                        // result = call.fw_write(hdev, tblk, tWrite);

                        call_contactLess.hex_a(strHexWrite, tWrite, 2 * (tWrite.length));
                        result = call_contactLess.fw_write_hex(hdev, tblk, strHexWrite);

                        if (0 == result) {
                            Log.i("DEV__", "_write block " + tblk + " :ok ");

                            // Card content
                            // read
                            // result = call.fw_read(hdev, tblk, tRead);

                            result = call_contactLess.fw_read_hex(hdev, tblk, strHexRead);

                            if (0 == result) {
                                Log.i("DEV__", "_read block " + tblk + " :ok ");

                                // for(i=0;i<16;i++)
                                // {
                                // Log.i("DEV__"," "+Integer.toHexString(tRead[i]));
                                // }

                                Log.i("DEV__", " " + String.valueOf(strHexRead));

                                // Chinese reading and writing demonstration
                                bytesCHNdata_in = "中文1234测试abc".getBytes();

                                for (i = 0; i < bytesCHNdata_in.length; i++)
                                    strCHNdata_in[i] = (char) bytesCHNdata_in[i];

                                call_contactLess.fw_write(hdev, chineseBlk, strCHNdata_in);
                                call_contactLess.fw_read(hdev, chineseBlk, strCHNdata_out);

                                try {
                                    for (i = 0; i < strCHNdata_out.length; i++)
                                        bytesCHNdata_out[i] = (byte) strCHNdata_out[i];
                                    strTmp = new String(bytesCHNdata_out, "UTF-8");
                                } catch (Exception e) {
                                }

                                Log.i("DEV__", " chinese data test:" + strTmp);

                                // Wallet operation example
                                // Wallet format
                                // value test
                                result = call_contactLess.fw_initval(hdev, val_blk, 1000);// 初值1000
                                if (0 == result) {
                                    Log.i("DEV__", " _initval block " + val_blk + " :ok");

                                    // Load (add value)
                                    result = call_contactLess.fw_increment(hdev, val_blk, 200);// +200
                                    if (0 == result) {
                                        // Wallet operation takes effect
                                        call_contactLess.fw_transfer(hdev, val_blk);// make increment valid
                                        Log.i("DEV__", " _increment block " + val_blk + " :ok");

                                        // Deduction (impairment)
                                        result = call_contactLess.fw_decrement(hdev, val_blk, 100);// -100
                                        if (0 == result) {
                                            // Wallet operation takes effect
                                            call_contactLess.fw_transfer(hdev, val_blk);// make decrement valid
                                            Log.i("DEV__", " _decrement block " + val_blk + "  :ok");

                                            // Read current balance
                                            result = call_contactLess.fw_readval(hdev, val_blk, pCurVal);
                                            if (0 == result) {
                                                Log.i("DEV__", " _readval block " + val_blk + "  ok:" + pCurVal[0]);
                                                cardData.putString("readval block", val_blk + "  ok:" + pCurVal[0]);
                                            } else
                                                Log.i("DEV__", " _readval error");
                                        } else
                                            Log.i("DEV__", " _decrement:error");
                                    } else
                                        Log.i("DEV__", " _increment:error");

                                } else
                                    Log.i("DEV__", " _initval:error");

                                // Example of changing card password
                                // result = call.changeKey(hdev, tSec, newKey, ctrlw, keyb);

                                call_contactLess.hex_a(strNewkey, newKey, 2 * (newKey.length));
                                result = call_contactLess.fw_changeKey_hex(hdev, tSec, strNewkey, strCtrlW, strKeyb);

                                if (0 == result) {
                                    Log.i("DEV__", " _changekey:ok");
                                    cardData.putString("changeKey", "ok");

                                    result = call_contactLess.fw_halt(hdev);

                                    call_contactLess.fw_beep(hdev, 2);// 20);//Device buzzing reminder
                                    //FlashLED(hdev, 300);// Light flashing reminder (only designated models support this function)

                                    if (0 == result) {
                                        Log.i("DEV__", " _halt:ok");

                                        timePass = System.currentTimeMillis() - startTime;
                                        Log.i("DEV__", " Time: " + timePass + " ms");
                                    } else {
                                        Log.i("DEV__", " _halt:error");
                                    }
                                } else {
                                    Log.i("DEV__", " _changekey:error");
                                }

                            } else {
                                Log.i("DEV__", "_read:error ");
                            }
                        } else {
                            Log.i("DEV__", "_write:error ");
                        }

                    } else {
                        Log.i("DEV__", "_authen:error ");
                        cardData.putString("_authen", "error");

                    }
                    Log.i("DEV__", "Serial Number of Card hex strCard: " + String.valueOf(strCard));
                    Log.i("DEV__", "FROM LAST Serial Number sn: " + String.format("%010d", sn));
                    cardData.putString("result", "success");
                    promise.resolve(cardData);

                } else {
                    Log.i("DEV__", "_find no card ");
                    cardData.putString("result", "failure");
                    cardData.putString("status", "_find no card ");
                    promise.resolve(cardData);
                }
            }
            call_contactLess.fw_exit(hdev);

        } // for(nTest = 0; nTest < linkedReaderNum; nTest++)

        //return result;

    }

}
