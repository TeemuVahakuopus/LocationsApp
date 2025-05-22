import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function MapScreen() {
  const { name } = useLocalSearchParams();
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name) return;

    const fetchCoords = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${name}&format=json`,
          {
            headers: {
              'User-Agent': 'LocationsApp/1.0',
            },
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          if (!isNaN(lat) && !isNaN(lon)) {
            setRegion({
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          } else {
            Alert.alert('Virhe', 'Koordinaattien lukeminen epäonnistui.');
          }
        } else {
          Alert.alert('Paikkaa ei löytynyt', 'Kohdetta ei löytynyt kartalta.');
        }
      } catch (error) {
        Alert.alert('Verkkovirhe', 'Sijaintia ei voitu hakea.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [name]);

  if (!name) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#555', paddingHorizontal: 20, textAlign: 'center' }}>
          Valitse ensin matkakohde kohdelistasta, niin näytämme sen sijainnin kartalla.
        </Text>
      </View>
    );
  }

  if (loading || !region) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Ladataan karttaa...</Text>
      </View>
    );
  }

  return (
    <MapView style={{ flex: 1 }} region={region}>
      <Marker coordinate={region} title={name as string} />
    </MapView>
  );
}
