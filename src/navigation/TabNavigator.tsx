import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LeagueStack from './LeagueStack';
import DreamTeamScreen from '../screens/DreamTeamScreen';
import MoreScreen from '../screens/MoreScreen';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      {emoji}
    </Text>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Leagues"
        component={LeagueStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏟️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Dream Team"
        component={DreamTeamScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚽" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⋯" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.darkCard,
    borderTopColor: Colors.darkSurface,
    borderTopWidth: 1,
    paddingTop: 6,
    height: 88,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 22,
  },
  tabIconFocused: {
    fontSize: 26,
  },
});
