import { StyleSheet } from "react-native";
import { button, white, textColor } from "constants/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    paddingHorizontal: 16
  },
  top: {
    minHeight: 100
  },
  signUp: {
    fontSize: 26,
    color: textColor,
    fontWeight: "600"
  },
  enterCred: {
    fontSize: 14,
    color: textColor,
    fontWeight: "400",
    marginTop: 13
  },
  inputs: {
    marginTop: 16
  },
  input: {
    marginLeft: 0,
    marginRight: 0
  },
  inputLabel: {
    fontSize: 16,
    color: textColor,
    fontWeight: "400",
    marginTop: 13,
    margin: 0,
    marginLeft: 5
  },
  signInButton: {
    width: "100%",
    alignSelf: "center",
    marginTop: 26,
    justifyContent: "center",
    backgroundColor: button
  }
});
