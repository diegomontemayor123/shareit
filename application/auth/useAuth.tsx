import { useContext } from 'react';
import AuthContext from './context';
import AuthStorage from './Storage';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser } = context;

  const logIn = async (authToken: string) => {
    try {
      if (typeof authToken !== 'string') {
        throw new Error('Auth token must be a string');
      }
      const user = jwtDecode<string>(authToken);

      setUser(user);
      await AuthStorage.storeToken(authToken);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during login:', error.message);
      } else {
        console.error('Unknown error during login');
      }
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setUser(null);
      await AuthStorage.removeToken();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during logout:', error.message);
      } else {
        console.error('Unknown error during logout');
      }
      throw error;
    }
  };

  return { user, logIn, logOut };
};

export default useAuth;
