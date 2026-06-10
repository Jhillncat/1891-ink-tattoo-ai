import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1891 Ink</Text>
      <Text style={styles.subtitle}>Aggie Tattoo AI</Text>

      <Button 
        mode="contained"
        onPress={() => router.push('/(tabs)/explore')}
        style={styles.button}
      >
        Start Designing
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#003366' },
  title: { fontSize:40, color:'#FFD100', fontWeight:'bold' },
  subtitle: { fontSize:18, color:'white', marginBottom:30 },
  button: { backgroundColor:'#FFD100' }
});

