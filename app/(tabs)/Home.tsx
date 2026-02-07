import Category from '@/components/HomeScreens/Category'
import Header from '@/components/HomeScreens/Header'
import PopularBuisness from '@/components/HomeScreens/PopularBuisness'
import Slider from '@/components/Slider'
import Colors from '@/services/Colors'
import React from 'react'
import { FlatList, View } from 'react-native'

export default function Home() {
  return (
    // header component
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={ (    
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
        <PopularBuisness />
        <View style={{ height: 100 }}></View>
    </View>)}/>
  )
}