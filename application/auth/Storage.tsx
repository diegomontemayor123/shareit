import * as SecureStore from 'expo-secure-store';
import {jwtDecode } from 'jwt-decode'; 

const key = 'authtoken';


const storeToken = async (authToken: string) => {
  try {
    if (typeof authToken !== 'string') {
      throw new Error('Auth token must be a string');
    }

    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error storing the auth token:', error.message);
    } else {
      console.log('Unknown error storing the auth token');
    }
    throw error;
  }
};

const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(key);
    return token;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error getting the auth token:', error.message);
    } else {
      console.log('Unknown error getting the auth token');
    }
    throw error;
  }
};

const getUser = async (): Promise<any | null> => { 
  try {
    const token = await getToken();
    return token ? jwtDecode<string>(token) : null; 
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error decoding the auth token:', error.message);
    } else {
      console.log('Unknown error decoding the auth token');
    }
    throw error;
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error removing the auth token:', error.message);
    } else {
      console.log('Unknown error removing the auth token');
    }
    throw error;
  }
};

export default { getUser, getToken, storeToken, removeToken };
