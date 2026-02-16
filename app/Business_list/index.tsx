import BusinessLIstCard from '@/components/BusinessScreens/BusinessLIstCard';
import { BusinessTypes } from '@/components/HomeScreens/PopularBuisness';
import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobaiApi';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Businesslist() {
    const { categoriesName } = useLocalSearchParams();
  const [OriginalBusinessList, setOriginalBusinessList] = React.useState<BusinessTypes[]>([]);
    const [businesslist, setBusinessList] = React.useState<BusinessTypes[]>([]);
    const [loading, setLoading] = React.useState(false);
    // const router = useRouter();
    useEffect(() => {
         GetBusinessListByName();
    }, []);
    const GetBusinessListByName = async () => {
        setLoading(true);
        const result = await axiosClient.get('/popular-businesses?filters[category][name][$eq]='+ categoriesName +"&populate=*");
        console.log(JSON.stringify(result.data.data, null, 2));
        setBusinessList(result.data.data);
          setOriginalBusinessList(result.data.data);
        setLoading(false);
    }

const OnSearchFilter=(searchInput:string)=>{
  if(!searchInput){
    setBusinessList(OriginalBusinessList);
    return;
  }
  const filteredList = OriginalBusinessList.filter((item) =>
    item.Name.toLowerCase().includes(searchInput.toLowerCase())
  );
  setBusinessList(filteredList);
}

  return (
    <View 
      style={{
        padding: 20,
        paddingTop:32
      }}>
        <View style={{ height: 200,
            backgroundColor: Colors.primary,
            position: 'absolute',
            width: '200%',
         }}></View>
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 10,marginTop: 15 }}> 
  <TouchableOpacity onPress={() => router.back()} style={{ padding: 10, borderRadius: 99, backgroundColor: Colors.primary }}> 
      <Ionicons name="arrow-back" size={28} color={Colors.White} />
  </TouchableOpacity>
      <Text style={{ color: Colors.White, fontSize: 25, fontFamily: 'appFontBold' }}>{categoriesName}  Business list</Text>
      </View>
     <View>
          <TextInput
        placeholder="Search Business..."
        style={{borderColor: '#ccc', borderWidth: 1, borderRadius: 99, padding: 15,fontSize:15,backgroundColor: Colors.White,
   paddingHorizontal:20, color: 'black' }}
        onChangeText={(text) => OnSearchFilter(text)}
      />
      <FlatList 
        data={businesslist}
        onRefresh={() => setBusinessList(OriginalBusinessList)}
        refreshing={loading}
        renderItem={({ item, index }) => (
      
          <BusinessLIstCard Business={item} key={index}/>
       
       
        )}
      />
    </View>
              {loading&& <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 25 }} />}
    
    </View>
  )
}