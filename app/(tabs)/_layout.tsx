import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'locations') {
            return <Text style={{ fontSize: 18 }}>📍</Text>;
          } else if (route.name === 'add') {
            return <Text style={{ fontSize: 18 }}>➕</Text>;
          } else if (route.name === 'map') {
            return <Text style={{ fontSize: 18 }}>🗺️</Text>;
          } else {
            return null;
          }
        },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tabs.Screen name="locations" options={{ title: 'Kohteet' }} />
      <Tabs.Screen name="add" options={{ title: 'Lisää' }} />
      <Tabs.Screen name="map" options={{ title: 'Kartta' }} />
    </Tabs>
  );
}
