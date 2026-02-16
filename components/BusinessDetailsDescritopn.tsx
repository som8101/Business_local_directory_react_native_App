import Colors from '@/services/Colors'
import React from 'react'
import { Text, View } from 'react-native'
import { BusinessTypes } from './HomeScreens/PopularBuisness'


type props={
business:BusinessTypes
}
export default function BusinessDetailsDescritopn({business}:props) {
  return (
    <View>
      <Text style={{
        fontFamily:'appFontBold',
        fontSize:20,
        padding:8,
        color:Colors.primary
      }}>Description</Text>
      <Text 
      style={{
        fontFamily:'appFont',
        fontSize:16,
        color:Colors.Gray,
        marginTop:5
      }}>
        {business?.Description}
      </Text>
          

    </View>
  )
}