import Colors from '@/services/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BusinessTypes, Star } from '../HomeScreens/PopularBuisness';

type Props = {
  Business: BusinessTypes;
}

export default function BusinessLIstCard({ Business }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/Business_details_Sceen',
        params: { business: JSON.stringify(Business) }
      })}
      style={{
        padding: 7,
        backgroundColor: Colors.White,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        gap: 15,
        marginTop: 10,
      }}>
      <Image source={{ uri: Business?.images[0]?.url }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15
        }} />
      <View
        style={{
          flex: 1,
          paddingVertical: 5,
          width: '70%',

        }}>
        <Text style={{ fontSize: 18, fontFamily: 'appFont' }}>{Business?.Name}</Text>
        <Text style={{ fontSize: 14, fontFamily: 'appFont', color: Colors.Gray }}>{Business?.address}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <Star />
          <Text style={{ color: Colors.primary, fontFamily: 'appFont', fontSize: 14, }}>View</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}