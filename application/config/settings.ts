import Constants from 'expo-constants';



const settings = {
  dev: {
    apiUrl: 'http://192.168.1.160:9000/api',
  },
  staging: {
    apiUrl: 'http://192.168.0.150:9000/api',
  },
  prod: {
    apiUrl: 'http://192.168.1.12:9000/api',
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.releaseChannel === 'staging') return settings.staging;
  return settings.prod;
};


export default getCurrentSettings();