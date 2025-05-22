import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

type Location = {
  id: string;
  name: string;
  description: string;
  rating: number;
};

export default function LocationsScreen() {
  const [locations, setLocations] = useState<Location[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const snapshot = await getDocs(collection(db, 'locations'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Location, 'id'>),
        }));
        setLocations(data);
      };

      fetchData();
    }, [])
  );

  return (
    <View style={{ padding: 20, paddingTop: 20, backgroundColor: '#fff', flex: 1 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Matkakohteet
      </Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() =>
            router.push({ pathname: '/(tabs)/map', params: item })
        }
        style={{
            backgroundColor: '#f2f2f2',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}
        >
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 4 }}>
            {item.name}
            </Text>
            <Text style={{ fontSize: 16, color: '#555' }}>
            {item.description}
            </Text>
            <Text style={{ marginTop: 8, color: '#333' }}>
            ⭐ Arvosana: {item.rating}
            </Text>
        </View>
        <Text style={{ fontSize: 24, marginLeft: 10 }}>🗺️</Text>
        </TouchableOpacity>
        )}
      />
    </View>
  );
}
