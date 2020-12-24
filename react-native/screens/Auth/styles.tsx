import { StyleSheet } from "react-native";
import { button, white, textColor } from "constants/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 50
  },
  top: {
    minHeight: 150
  },
  signIn: {
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
    marginTop: 46,
    justifyContent: "center",
    backgroundColor: button,
    minHeight: 50
  },
  signInButtonLabel: {
    color: white,
    fontSize: 18,
    fontFamily: "Roboto_medium"
  },
  signUpTitle: {
    color: "#8c8c8c"
  },
  row: {
    alignItems: "center",
    justifyContent: "center"
  },
  signUp: {
    marginLeft: 5
  },
  signUpButtonLabel: {
    color: button,
    fontFamily: "Roboto_medium"
  }
});
