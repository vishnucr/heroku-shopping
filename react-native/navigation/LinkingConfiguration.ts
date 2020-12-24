import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Splash: "Splash",
      Login: "Login",
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one"
            }
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two"
            }
          }
        }
      },
      NotFound: "*"
    }
  }
};
