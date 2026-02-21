import BusinessLIstCard from '@/components/BusinessScreens/BusinessLIstCard';
import { BusinessTypes } from '@/components/HomeScreens/PopularBuisness';
import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function Favorite() {
  const { user } = useUser();
  const [businesslist, setBusinessList] = useState<BusinessTypes[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && GetUserFavBusinessList();
  }, [user])
  const GetUserFavBusinessList = async () => {
    setLoading(true);
    const result = await axiosClient.get('/user-favorites?filters[UserEmail][$eq]=' + user?.primaryEmailAddress?.emailAddress);
    console.log('marked', JSON.stringify(result?.data?.data, null, 2))
    let businessIds: any[] = [];
    const FavList = result?.data?.data;
    FavList.forEach((item: any) => {
      businessIds.push(item.businessId);
    });
    console.log('businessId', businessIds);
    await GetBusinessList(businessIds);
    setLoading(false);
  }
  const GetBusinessList = async (businessId: any) => {
    const result = await axiosClient.get('/popular-businesses?', {
      params: {
        'filters[id][$in]': businessId,
        'populate': '*'
      }
    });
    console.log('businessList', JSON.stringify(result?.data?.data, null, 2));
    setBusinessList(result?.data?.data);
  }
  return (
    <View style={{
      padding: 20,
      paddingTop: 30
    }}>
      <View style={{
        height: 300,
        width: '200%',
        backgroundColor: Colors.primary,
        position: 'absolute'
      }}></View>
      <Text style={{
        fontFamily: 'appFontBolds',
        fontSize: 28,
        color: Colors.White
      }} >Favorite Business</Text>
      {loading ? <ActivityIndicator size="large" color={Colors.primary} /> :
        <FlatList
          data={businesslist}
          showsVerticalScrollIndicator={false}
          onRefresh={() => GetUserFavBusinessList()}
          refreshing={loading}
          renderItem={({ item, index }) => <BusinessLIstCard Business={item} key={index} />}

        />}
    </View>
  )
}