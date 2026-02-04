import Category from '@/components/HomeScreens/Category'
import Header from '@/components/HomeScreens/Header'
import Slider from '@/components/Slider'
import Colors from '@/services/Colors'
import React from 'react'
import { View } from 'react-native'

export default function Home() {
  return (
    // header component
    <View style={{ paddingTop: 38, padding: 20 }}>
      <View style={{
         height: 300,
         width: '200%',
          backgroundColor: Colors.primary,
          position : 'absolute'   }}></View>
      <Header />
    
    { /*Slider component*/}
        <Slider />
    { /*Catagory component*/}
        
        <Category />
   { /* popular buisness*/}
    </View>
  )
}