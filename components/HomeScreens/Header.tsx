import Colors from '@/services/Colors';
import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        <Image source={{ uri: user?.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 99 }} />
        <View>
          <Text style={styles.heading}>Welcome,</Text>
          <Text style={styles.heading}>{user?.fullName}</Text>
        </View>
      </View>
      <Image source={require('./../../assets/images/bell.png')}
        style={{ width: 40, height:40, resizeMode: 'contain' }} />
      </View>
      <TextInput
        placeholder="Search..."
        style={{borderColor: '#ccc', borderWidth: 1, borderRadius: 99, padding: 15,backgroundColor: Colors.White,
   marginTop: 20,paddingHorizontal:20, color: 'black' }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
heading: {
  fontSize: 18,
  fontFamily: 'appFont',
  color: Colors.White
  // fontWeight: 'bold',
},
});
