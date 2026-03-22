import React, { createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import AuthScreen from './src/screens/AuthScreen';
import { useAuth } from './src/hooks/useAuth';
import { Colors } from './src/constants/colors';

// Auth context so any screen can access user info
export const AuthContext = createContext<{
  user: any | null;
  profile: any | null;
  isGuest: boolean;
  refreshProfile: () => void;
  clearAuth: () => void;
}>({
  user: null,
  profile: null,
  isGuest: false,
  refreshProfile: () => {},
  clearAuth: () => {},
});

export default function App() {
  const { user, profile, loading, isGuest, setGuest, clearAuth, refreshProfile } = useAuth();

  // Show loading spinner while checking session
  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: Colors.dark, justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar style="light" />
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      </SafeAreaProvider>
    );
  }

  // Show auth screen if not logged in and not guest
  if (!user && !isGuest) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AuthScreen
          onAuthSuccess={() => {}}
          onSkip={setGuest}
        />
      </SafeAreaProvider>
    );
  }

  // Main app
  return (
    <AuthContext.Provider value={{ user, profile, isGuest, refreshProfile, clearAuth }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
