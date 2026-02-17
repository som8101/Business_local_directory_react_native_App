import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobaiApi';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
export type BusinessTypes = {
  Name: string;
  Description: string;
  premium: boolean;
  address: string;
  images: ImagesType[];
  phone: string;
  website: string;
  id: number;
}
type ImagesType = {
  url: string;
}
export default function PopularBuisness() {
  const [business, setBusiness] = useState<BusinessTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    GetBusinessList();
  }, []);
  const GetBusinessList = async () => {
    setLoading(true);
    const result = await axiosClient.get('/popular-businesses?filter[premium][$eq]=true&populate=*');
    // console.log(JSON.stringify(result.data.data, null, 2));
    setBusiness(result.data.data);
    setLoading(false);
  }
  return (
    <View>
      < View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <Text style={{
          fontSize: 20,
          fontFamily: 'appFontBold', marginTop: 10,
          color: '#000'
        }}>Popular Businesses</Text>
        <Text style={{ color: Colors.primary, fontFamily: 'appFont' }}>View All</Text>
      </View>
      <View>
        <FlatList
          data={business}
          horizontal={true}
          showsHorizontalScrollIndicator={false}

          style={{ backgroundColor: Colors.White, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
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
              }}
              style={{
                width: 230,
                marginRight: 15

              }}>
              <Image
                source={{ uri: item.images[0].url }}
                style={{
                  width: '100%', height: 125,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  // alignSelf:'center'

                }}
              />
              <View style={{ padding: 10 }}>
                <Text style={{ fontFamily: 'appFontBold', fontSize: 17 }}>{item?.Name}</Text>
                <Text style={{ fontFamily: 'appFont', fontSize: 12, marginTop: 5, color: Colors.Gray }}>{item?.address}</Text>
                <Star />

              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {loading && <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />}
    </View>
  )
}
export function Star() {
  return (

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <Image
        source={require('./../../assets/images/star.png')}
        style={{ width: 20, height: 20 }}
      />
      <Text style={{ fontFamily: 'appFont', fontSize: 12, marginTop: 5, color: Colors.Gray }}>4.5</Text>
    </View>)
}