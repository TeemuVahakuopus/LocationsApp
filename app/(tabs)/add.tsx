import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { router } from 'expo-router';

export default function AddScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const handleAdd = async () => {
    if (!name || !description || !rating) {
      Alert.alert('Täytä kaikki kentät');
      return;
    }

    await addDoc(collection(db, 'locations'), {
      name,
      description,
      rating: parseInt(rating),
    });

    setName('');
    setDescription('');
    setRating('');

    router.push('/(tabs)/locations');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
      }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Lisää uusi matkakohde
        </Text>

        <Text style={{ marginBottom: 6 }}>Nimi:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Esim. Helsinki"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            backgroundColor: '#f9f9f9',
          }}
        />

        <Text style={{ marginBottom: 6 }}>Kuvaus:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Kuvaile paikkaa"
          multiline
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            backgroundColor: '#f9f9f9',
            textAlignVertical: 'top',
            height: 100,
          }}
        />

        <Text style={{ marginBottom: 6 }}>Arvosana (1–5):</Text>
        <TextInput
          value={rating}
          onChangeText={setRating}
          placeholder="Esim. 4"
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            backgroundColor: '#f9f9f9',
          }}
        />

        <Button title="Lisää kohde" onPress={handleAdd} color="#2196F3" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
