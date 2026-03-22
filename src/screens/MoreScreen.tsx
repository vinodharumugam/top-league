import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { AuthContext } from '../../App';
import TransfersScreen from './TransfersScreen';
import HighlightsScreen from './HighlightsScreen';
import ProfileScreen from './ProfileScreen';

type SubScreen = 'menu' | 'transfers' | 'highlights' | 'profile';

export default function MoreScreen() {
  const [subScreen, setSubScreen] = useState<SubScreen>('menu');
  const { user, profile, isGuest, clearAuth } = useContext(AuthContext);

  if (subScreen === 'transfers') {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setSubScreen('menu')} style={styles.backButton}>
          <Text style={styles.backText}>← Back to More</Text>
        </TouchableOpacity>
        <TransfersScreen />
      </SafeAreaView>
    );
  }

  if (subScreen === 'highlights') {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setSubScreen('menu')} style={styles.backButton}>
          <Text style={styles.backText}>← Back to More</Text>
        </TouchableOpacity>
        <HighlightsScreen />
      </SafeAreaView>
    );
  }

  if (subScreen === 'profile' && user) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => setSubScreen('menu')} style={styles.backButton}>
          <Text style={styles.backText}>← Back to More</Text>
        </TouchableOpacity>
        <ProfileScreen
          userId={user.id}
          username={profile?.username || 'Player'}
          onSignOut={clearAuth}
        />
      </SafeAreaView>
    );
  }

  const ITEMS = [
    ...(user
      ? [{ title: 'Profile', emoji: '👤', sub: `${profile?.username || 'View'} · W${profile?.wins || 0} D${profile?.draws || 0} L${profile?.losses || 0}`, action: () => setSubScreen('profile') }]
      : [{ title: 'Sign In', emoji: '🔑', sub: 'Log in to save match history', action: () => clearAuth() }]
    ),
    { title: 'Transfers', emoji: '🔄', sub: 'Latest deals across all leagues', action: () => setSubScreen('transfers') },
    { title: 'Highlights', emoji: '🎬', sub: 'Watch the best goals & moments', action: () => setSubScreen('highlights') },
    { title: 'Settings', emoji: '⚙️', sub: 'App preferences', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>More</Text>

      {/* User Status Bar */}
      {user ? (
        <View style={styles.userBar}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {(profile?.username || '?')[0].toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.userName}>{profile?.username || 'Player'}</Text>
            <Text style={styles.userStatus}>Logged in</Text>
          </View>
        </View>
      ) : isGuest ? (
        <View style={styles.guestBar}>
          <Text style={styles.guestText}>Playing as Guest · Match history won't be saved</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {ITEMS.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.item}
            onPress={item.action}
            activeOpacity={0.7}
          >
            <Text style={styles.itemEmoji}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSub}>{item.sub}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Top League v1.0</Text>
        <Text style={styles.footerText}>Made by Rayden ⚽</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  userBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginBottom: 16,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.dark,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userStatus: {
    fontSize: 12,
    color: Colors.primaryLight,
  },
  guestBar: {
    backgroundColor: Colors.darkCard,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.darkSurface,
  },
  guestText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkCard,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  itemEmoji: {
    fontSize: 26,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  itemSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  arrow: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
