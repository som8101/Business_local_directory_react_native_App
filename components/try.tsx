import React from 'react'
import { Image, Text, View } from 'react-native'

export default function Try() {
  return (
    <View>
      <Text>Try</Text>
      <Image
        source={require('./../assets/images/google.png')}
        style={{ width: 100, height: 100 }}
      />
    </View>
  )
}