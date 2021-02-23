import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, SafeAreaView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexShrink: 1,
  },
  icons: {
    
  }
});

const UserGreet = () => {

  const user = useSelector(state => state.user);

  const [activeSub, setActiveSub] = useState(false);

  useEffect(() => {
    if(user){
      const sub = user.subscription.filter(a => a.active === true);
      setActiveSub(sub.length > 0);
    }
    
  }, [user])

  if(!user){
    return null;
  }

  const crown = activeSub ?  <Icon name="crown" size={20} color="green" /> : null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={ user ? theme.subHeaderText : theme.invisible}>
        {crown}
        {" "}
        {user.fullName}
      </Text>
    </SafeAreaView>
  );
}

export default UserGreet;