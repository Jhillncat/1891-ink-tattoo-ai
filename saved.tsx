import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function SavedScreen() {
  const [savedIdeas, setSavedIdeas] = useState<any[]>([]);

  useEffect(() => {
    loadSavedIdeas();
  }, []);

  const loadSavedIdeas = async () => {
    const data = await AsyncStorage.getItem('savedTattoos');
    if (data) setSavedIdeas(JSON.parse(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Saved Tattoos</Text>
      <FlatList
        data={savedIdeas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontWeight: 'bold' }
});
