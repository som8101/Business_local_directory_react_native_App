import { BusinessTypes, Star } from '@/components/HomeScreens/PopularBuisness';
import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobaiApi';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Explore() {
  const [loading, setLoading] = useState(false);
  const [businesslist, setBusinessList] = useState<BusinessTypes[]>([]);
  const searchTimer = useRef<any>(null);
  const [searchText, setsearchText] = useState<string>('');
  const router = useRouter();
  useEffect(() => {
    GetBusinessList();
  }, []);
  const GetBusinessList = async () => {
    setLoading(true);
    const result = await axiosClient.get('/popular-businesses?filter[premium][$eq]=true&populate=*');
    // console.log(JSON.stringify(result.data.data, null, 2));
    setBusinessList(result.data.data);
    setLoading(false);

  }
  const onChangeSearchInput = (value: string) => {
    setsearchText(value);
    if (searchTimer?.current) {
      clearTimeout(searchTimer.current)
    }
    searchTimer.current = setTimeout(() => {
      if (value.trim() == '') {
        GetBusinessList();
      } else {
        console.log('search input' + value);
        searchBusniess(value)
      }
    }, 500)
  }
  const searchBusniess = async (value: string) => {
    setLoading(true);
    const result = await axiosClient.get('/popular-businesses?filters[Name][$contains]=' + value + '&populate=*');
    console.log(JSON.stringify(result.data.data, null, 2));
    setBusinessList(result.data.data);
    setLoading(false);
  }

  return (
    <View style={{
      padding: 20,
      paddingTop: 30
    }
    }>
      <View style={{
        height: 300,
        width: '200%',
        backgroundColor: Colors.primary,
        position: 'absolute'
      }}></View>

      {/* search bar */}
      <Text style={{
        fontFamily: 'appFontBolds',
        fontSize: 28,
        color: Colors.White
      }} >Explore All Business</Text>
      <TextInput
        placeholder="Search Business..."
        style={{
          borderColor: '#ccc', borderWidth: 1, borderRadius: 99, padding: 15, fontSize: 18, backgroundColor: Colors.White,
          paddingHorizontal: 20, color: 'black', marginTop: 15
        }}
        onChangeText={(value) => onChangeSearchInput(value)}
      />

      {/* business list */}
      <FlatList
        data={businesslist}
        onRefresh={() => searchText ? searchBusniess(searchText) : GetBusinessList()}
        refreshing={loading}
        style={{
          marginBottom: 90
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{
            margin: 10,
            backgroundColor: Colors.White,
            borderRadius: 20
          }}>
            <TouchableOpacity
              onPress={() => {
                router.push(
                  {
                    pathname: '/Business_details_Sceen',
                    params: {
                      business: JSON.stringify(item)
                    }
                  }
                )
              }
              }
              key={index}>
              <Image source={{ uri: item?.images[0].url }}
                style={{
                  width: '100%', height: 180,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20
                }} />
              <View style={{ padding: 10 }}>
                <Text style={{ fontFamily: 'appFontBold', fontSize: 17 }}>{item?.Name}</Text>
                <Text style={{ fontFamily: 'appFont', fontSize: 12, marginTop: 5, color: Colors.Gray }}>{item?.address}</Text>
                <View style={
                  {
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }
                }>
                  <Star />
                  <Text style={{ color: Colors.primary, fontFamily: 'appFont' }}>View All</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>)
        }
      />
    </View>
  )
}