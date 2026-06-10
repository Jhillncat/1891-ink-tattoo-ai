import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ResultsScreen() {
  const { name, interest } = useLocalSearchParams();
  const router = useRouter();

  // AI-style random generator lists
  const stylesList = ["minimalist", "geometric", "floral", "tribal", "fine line"];
  const symbols = ["crown", "lion", "lotus flower", "compass", "phoenix"];
  const meanings = ["strength", "growth", "resilience", "ambition", "balance"];

  function getRandomItem(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Generate 3 random tattoo ideas
  const ideas = Array.from({ length: 3 }, () => {
    const style = getRandomItem(stylesList);
    const symbol = getRandomItem(symbols);
    const meaning = getRandomItem(meanings);

    return {
      title: `${style} ${symbol} tattoo`,
      description: `A ${style} design of a ${symbol} symbolizing ${meaning} and inspired by your interest in ${interest}, connected to ${name}.`
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={ideas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() =>
                router.push({
                  pathname: '/visualizer',
                  params: { title: item.title, description: item.description }
                })
              }>

                Visualize
              </Button>

              <Button onPress={async () => {
                const saved = await AsyncStorage.getItem('savedTattoos');
                const savedArray = saved ? JSON.parse(saved) : [];
                savedArray.push(item);
                await AsyncStorage.setItem('savedTattoos', JSON.stringify(savedArray));
                alert("Saved!");
              }}>
                Save
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <Button
        mode="outlined"
        onPress={() => router.push('/')}
        style={{ margin: 15 }}
      >
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { margin: 10 }
});

