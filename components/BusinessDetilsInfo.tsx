import Colors from '@/services/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BusinessTypes, Star } from './HomeScreens/PopularBuisness';

type props = {
    business: BusinessTypes
}
export default function BusinessDetilsInfo({ business }: props) {

    return (
        <View style={{marginTop:5}}>

            <Image source={{ uri: business?.images[0]?.url }}
                style={{
                    width: '100%',
                    height: 250,
                    borderRadius: 13
                }}
            />
            <View
                style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <Text style={{
                    fontSize: 28,
                    fontFamily: 'appFont'
                }}>{business?.Name}</Text>
                <Star />
            </View>
            <View
                style={style.makeItemCenter}>
                <Ionicons name="location-outline" size={30} color={Colors.primary} />
                <Text style={style.iconStyle}>{business?.address}</Text>
            </View>
            <View
                style={style.makeItemCenter}>
                    <Ionicons name="globe-outline" size={30} color={Colors.primary} />  
                      <Text style={style.iconStyle}>{business?.website || 'Website.com'}</Text>
            </View>


        </View>
    )
} 
export const style = StyleSheet.create({
    makeItemCenter:{
          padding: 8,
          paddingTop:5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: 8
    },
    iconStyle:{
        color: Colors.Gray, fontFamily: 'appFont', fontSize: 18 
    }
})