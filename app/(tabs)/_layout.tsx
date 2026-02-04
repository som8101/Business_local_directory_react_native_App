import Colors from '@/services/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';

export default function TabLayout() {
const Navication = useNavigation();
useEffect(() => {
  Navication.setOptions({
    headerShown: false,     
  });
}, []);

  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: Colors.primary, }}>
      <Tabs.Screen name="Home" options={{ title: 'Home',
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
       }} />
      <Tabs.Screen name="Explore" options={{ title: 'Explore',
        tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />
        }} />
      <Tabs.Screen name="Favorite" options={{ title: 'Favorites',
        tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
        }} />
      <Tabs.Screen name="Profile" options={{ title: 'Profile',
        tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }} />
    </Tabs>
  )
}