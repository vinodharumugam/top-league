import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { useHighlights } from '../hooks/useHighlights';
import HighlightCard from '../components/highlights/HighlightCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

export default function HighlightsScreen() {
  const { highlights, loading, error, refetch } = useHighlights();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎬 Match Highlights</Text>
      <Text style={styles.subtitle}>Watch the best goals & moments</Text>

      {loading ? (
        <LoadingSpinner message="Loading highlights..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <FlatList
          data={highlights}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <HighlightCard
              highlight={item}
              onPress={() =>
                Alert.alert(
                  '🎬 ' + item.title,
                  'Video playback will be available when connected to a highlights API!\n\nScore: ' + item.score,
                  [{ text: 'OK' }]
                )
              }
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
