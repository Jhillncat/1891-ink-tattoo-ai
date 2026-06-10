import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function VisualizerScreen() {
  const router = useRouter();
  const { title, description } = useLocalSearchParams();
  const [placement, setPlacement] = useState<string | null>(null);

  const getTattooStyle = () => {
    switch (placement) {
      case 'Forearm':
        return { position: 'absolute', top: 170, left: 175 };
      case 'Shoulder':
        return { position: 'absolute', top: 80, left: 145 };
      case 'Back':
        return { position: 'absolute', top: 120, left: 125 };
      default:
        return {};
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tattoo Placement Visualizer</Text>
      {title && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
            Previewing: {title}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 13 }}>
            {description}
          </Text>
        </View>
      )}


      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/body.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {placement && (
          <View style={[styles.tattooMarker, getTattooStyle()]} />
        )}
      </View>

      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={() => setPlacement('Forearm')}>Forearm</Button>
        <Button mode="outlined" onPress={() => setPlacement('Shoulder')}>Shoulder</Button>
        <Button mode="outlined" onPress={() => setPlacement('Back')}>Back</Button>
      </View>

      {placement && (
        <Text style={styles.previewText}>
          Tattoo preview placed on: {placement}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={() => router.push('/')}
        style={styles.homeButton}
      >
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },

  imageContainer: {
    width: 250,
    height: 350,
    marginVertical: 15
  },

  image: {
    width: '100%',
    height: '100%'
  },

  tattooMarker: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10
  },

  previewText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },

  homeButton: {
    marginTop: 20,
    backgroundColor: '#003366'
  }
});



