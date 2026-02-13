import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobaiApi';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function Category() {

  type CategoryTypes = {
    name: string;
    icon: { url: string; };
  }
  useEffect(() => {
    getCategories();
  }, []);

  const router = useRouter();
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  console.log("Fetching categori es...");
  const getCategories = async () => {
    // Fetch categories from API or define them statically
    const result = await axiosClient.get('/categories?populate=*');
    // console.log(JSON.stringify(result.data.data , null, 2)); //filter[premium][$eq]=true&
    setCategories(result.data.data);
  }
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'appFontBold', marginTop: 10,
            color: '#000'
          }}>
          Categories
        </Text>
        <Text style={{ color: Colors.primary, fontFamily: 'appFont' }}> View All</Text>
      </View>
      {/* images  */}
      <FlatList

        data={categories}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 85,
            marginVertical: 4,
            margin: 3,
            padding: 5,
            backgroundColor: Colors.White,
            borderRadius: 10

          }}
            onPress={() => router.push(
              {
                pathname: "../Business_list",
                params: {
                  categoriesName: item?.name
                }
              }
            )}
          >
            <Image
              source={{ uri: item?.icon?.url }}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontFamily: 'appFont', textAlign: 'center', marginTop: 5 }}>{item?.name}</Text>
          </  TouchableOpacity>
        )}
      />
    </View>
  )
}