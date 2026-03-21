import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LeaguesScreen from '../screens/LeaguesScreen';
import LeagueDetailScreen from '../screens/LeagueDetailScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';

const Stack = createNativeStackNavigator();

export default function LeagueStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeaguesList" component={LeaguesScreen} />
      <Stack.Screen name="LeagueDetail" component={LeagueDetailScreen} />
      <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
    </Stack.Navigator>
  );
}
