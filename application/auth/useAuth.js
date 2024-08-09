import { useContext } from 'react';
import AuthContext from './context';
import AuthStorage from './Storage';
import {jwtDecode} from 'jwt-decode'

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
 
    try {
      if (typeof authToken !== 'string') {
        throw new Error('Auth token must be a string');
      }
      const user = jwtDecode(authToken);
     
      setUser(user);
      await AuthStorage.storeToken(authToken);
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setUser(null);
      await AuthStorage.removeToken();
    } catch (error) {
      console.error('Error during logout:', error.message);
      throw error;
    }
  };

  return { user, logIn, logOut };
};

export default useAuth;
