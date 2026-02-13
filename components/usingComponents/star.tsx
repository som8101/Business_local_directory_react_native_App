import Colors from '@/services/Colors'
import React from 'react'
import { Image, Text, View } from 'react-native'

export default function star() {
  return (

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Image
                  source={require('./../../assets/images/star.png')}
                  style={{ width: 20, height: 20}}
                />
                  <Text style={{ fontFamily: 'appFont', fontSize: 12, marginTop: 5, color: Colors.Gray }}>4.5</Text>
                </View>
    
  )
}