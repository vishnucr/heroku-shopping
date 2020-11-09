import Constants from "expo-constants";

const ENV = {
  dev: {
    BASE_URL: "https://reqres.in"
  },
  prod: {
    BASE_URL: "https://reqres.in"
  }
};

function getEnvVars(env = "") {
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
  return ENV.dev;
}

export default getEnvVars(Constants.manifest.releaseChannel);
