import Colors from '@/services/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from "expo-web-browser";
import React from 'react';
import { Linking, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BusinessTypes } from './HomeScreens/PopularBuisness';

type props = {
    business: BusinessTypes
}
export default function ActionButtonSection({ business }: props) {
    const onNavigate= async ()=>{
        const nativeUrl= Platform.OS== 'ios'
        ?`maps:0,0?q=${business?.address}`
        :`geo:0,0?q=${business?.address}`
        await Linking.openURL(nativeUrl);
    }
    const callNumber =  async() => {
         const phone = `tel:${business?.phone}`;
   await Linking.openURL(phone);
  };
const openInApp = async () => {
    const url= business?.website.startsWith('http')? business?.website:`https://${business?.website}`;
  await WebBrowser.openBrowserAsync(url);
};
const openShare= async ()=>{
const  result= await Share.share(
    {
        message:'CheckOut Our local Business... \n'
        +business?.images[0].url+'\n'
        +business?.Name+'\n'+
        +business?.website

    }
)
}


    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent:'space-between',
            marginHorizontal:5
        }}>
            <TouchableOpacity onPress={()=>onNavigate()}>
            <View style={style.container}>
                <Ionicons name="locate-outline" size={30} color={Colors.White} />
            </View>
            <Text style={style.Actiontext}>Location</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={()=>callNumber()}>
            <View style={style.container}>
                <Ionicons name="call" size={30} color={Colors.White} />
            </View>
            <Text style={style.Actiontext}>Call</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={()=>openInApp()}>
            <View style={style.container}>
                <Ionicons name="globe-outline" size={30} color={Colors.White} />
            </View>
            <Text style={style.Actiontext}>Website</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={()=>openShare()}>
            <View style={style.container}>
                <Ionicons name="share" size={30} color={Colors.White} />
        </View>
            <Text style={style.Actiontext}>share</Text>
            </TouchableOpacity>


        </View>
    )
}
const style = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius:15

    },
    Actiontext:{
        fontFamily:'appFont',
        marginTop:2,
        textAlign:'center'
    }
})