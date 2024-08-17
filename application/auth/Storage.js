import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from 'jwt-decode'; // Correct import

const key = 'authtoken';

const storeToken = async (authToken) => {
  try {
    if (typeof authToken !== 'string') {
      throw new Error('Auth token must be a string');
    }

    await SecureStore.setItemAsync(key, authToken);
   
  } catch (error) {
    console.log('Error storing the auth token:', error.message);
    throw error;
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(key);
   
    return token;
  } catch (error) {
    console.log('Error getting the auth token:', error.message);
    throw error;
  }
};

const getUser = async () => {
  try {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
  } catch (error) {
    console.log('Error decoding the auth token:', error.message);
    throw error;
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('Error removing the auth token:', error.message);
    throw error;
  }
};

export default { getUser, getToken, storeToken, removeToken };
