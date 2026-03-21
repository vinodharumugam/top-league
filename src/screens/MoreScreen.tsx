import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import TransfersScreen from './TransfersScreen';
import HighlightsScreen from './HighlightsScreen';

type SubScreen = 'menu' | 'transfers' | 'highlights';

export default function MoreScreen() {
  const [subScreen, setSubScreen] = useState<SubScreen>('menu');

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

  const ITEMS = [
    { title: 'Transfers', emoji: '🔄', sub: 'Latest deals across all leagues', action: () => setSubScreen('transfers') },
    { title: 'Highlights', emoji: '🎬', sub: 'Watch the best goals & moments', action: () => setSubScreen('highlights') },
    { title: 'Settings', emoji: '⚙️', sub: 'App preferences', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>More</Text>
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
