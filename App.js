import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './application/navigation/AppNavigator';
import navigationTheme from './application/navigation/navigationTheme';
import OfflineNotification from './application/components/OfflineNotification';
import AuthNavigator from './application/navigation/AuthNavigator';
import AuthContext from './application/auth/context';
import AuthStorage from './application/auth/Storage';
import { navigationRef } from './application/navigation/rootNavigation';
import * as SplashScreen from 'expo-splash-screen';
import logger from './application/utility/logger';

logger.start();

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreUser = async () => {
      const user = await AuthStorage.getUser();
      if (user) setUser(user);
    };

    const prepareApp = async () => {
      try {
        await restoreUser();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        // Hide the splash screen once the app is ready
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!isReady) return null; // Render nothing while the app is loading

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotification />
      <NavigationContainer theme={navigationTheme} ref={navigationRef}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
