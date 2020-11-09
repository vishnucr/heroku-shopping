import React from "react";
import { View } from "react-native";

export default function Splash({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);
  });
  return <View></View>;
}
