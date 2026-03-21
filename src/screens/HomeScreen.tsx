import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { LEAGUES } from '../constants/leagues';

const { width } = Dimensions.get('window');

const FEATURES = [
  { title: 'Dream Team', subtitle: 'Build your $20M squad', icon: '⚽', color: '#FFD700', tab: 'Dream Team' },
  { title: 'Transfers', subtitle: 'Latest deals', icon: '🔄', color: '#FF6D00', tab: 'More' },
  { title: 'Highlights', subtitle: 'Watch the best goals', icon: '🎬', color: '#E91E63', tab: 'More' },
  { title: 'Multiplayer', subtitle: 'Challenge friends', icon: '🆚', color: '#00BCD4', tab: 'Dream Team' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>⚽ TOP LEAGUE</Text>
          <Text style={styles.tagline}>Your Ultimate Football Hub</Text>
        </View>

        {/* Quick Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Dream Team')}
        >
          <Text style={styles.playButtonIcon}>🏆</Text>
          <View>
            <Text style={styles.playButtonTitle}>Play Dream Team</Text>
            <Text style={styles.playButtonSub}>Build your squad & compete!</Text>
          </View>
          <Text style={styles.playArrow}>▶</Text>
        </TouchableOpacity>

        {/* Leagues Section */}
        <Text style={styles.sectionTitle}>🏟️ Leagues</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.leaguesRow}
        >
          {LEAGUES.map((league) => (
            <TouchableOpacity
              key={league.id}
              style={[styles.leagueCard, { borderColor: league.color }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Leagues')}
            >
              <Text style={styles.leagueEmoji}>{league.emoji}</Text>
              <Text style={styles.leagueName}>{league.shortName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Features Grid */}
        <Text style={styles.sectionTitle}>🔥 Explore</Text>
        <View style={styles.featuresGrid}>
          {FEATURES.map((feature) => (
            <TouchableOpacity
              key={feature.title}
              style={[styles.featureCard, { borderLeftColor: feature.color }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(feature.tab)}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSub}>{feature.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer spacing */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.accent,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    gap: 14,
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonIcon: {
    fontSize: 36,
  },
  playButtonTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  playButtonSub: {
    fontSize: 13,
    color: Colors.primaryLight,
    marginTop: 2,
  },
  playArrow: {
    fontSize: 20,
    color: Colors.accent,
    marginLeft: 'auto',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 14,
  },
  leaguesRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  leagueCard: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: 90,
    borderLeftWidth: 3,
  },
  leagueEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  leagueName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  featureCard: {
    backgroundColor: Colors.darkCard,
    borderRadius: 14,
    padding: 16,
    width: (width - 44) / 2,
    borderLeftWidth: 3,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  featureSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
