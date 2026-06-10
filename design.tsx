import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function DesignScreen() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TextInput
        label="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Interests or Vibe"
        value={interest}
        onChangeText={setInterest}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() =>
          router.push({
            pathname: '/results',
            params: { name, interest }
          })
        }
        style={styles.button}
      >
        Generate Tattoo Ideas
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginBottom: 15 },
  button: { backgroundColor: '#003366' }
});
