import ActionButtonSection from '@/components/ActionButtonSection';
import BusinessDetailsDescritopn from '@/components/BusinessDetailsDescritopn';
import BusinessDetilsInfo from '@/components/BusinessDetilsInfo';
import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function Business_details_Sceen() {
  const router = useRouter();
  const { business } = useLocalSearchParams();
  const { user } = useUser();
  const businessDetails = JSON.parse(business.toString());
  const [isSet, setisSet] = useState(false);
  const [favDetails, setfavDetails] = useState<{ documentId: string }>();
  useEffect(() => {
    user && checkFavMarked();
  }, [user])
  const markedAsFavorite = async () => {
    if (isSet) {
      await axiosClient.delete('/user-favorites/' + favDetails?.documentId);
      ToastAndroid.show('Removed Marked busniness favorite!', ToastAndroid.BOTTOM)
      checkFavMarked();
    } else {

      const result = await axiosClient.post('user-favorites', {
        data: {
          businessId: businessDetails?.id,
          UserEmail: user?.primaryEmailAddress?.emailAddress
        }
      }
      );

      ToastAndroid.show('Marked busniness favorite!', ToastAndroid.BOTTOM)
      checkFavMarked();
    }

  }
  const checkFavMarked = async () => {
    const result = await axiosClient.get('user-favorites?filters[UserEmail][$eq]=' + user?.primaryEmailAddress?.emailAddress + '&filters[businessId][$eq]=' + businessDetails?.id);
    console.log('fav result', result?.data?.data);
    const data = result?.data?.data;
    setfavDetails(data[0]);
    if (data?.length > 0) {
      setisSet(true)
    } else {
      setisSet(false)

    }
  }



  return (
    <View style={{ padding: 12, paddingTop: 25 }}>
      <View style={{
        height: 200,
        backgroundColor: Colors.primary,
        position: 'absolute',
        width: '200%',
      }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10, borderRadius: 99, backgroundColor: Colors.primary }}>
          <Ionicons name="arrow-back" size={30} color={Colors.White} />
        </TouchableOpacity>
        {!isSet ? <TouchableOpacity onPress={markedAsFavorite}>
          <Ionicons name="bookmark-outline" size={30} color={Colors.White} />
        </TouchableOpacity> :
          <TouchableOpacity onPress={markedAsFavorite}>
            <Ionicons name="bookmark" size={30} color={Colors.White} />
          </TouchableOpacity>
        }
      </View>
      {/* Business info section */}
      <BusinessDetilsInfo business={businessDetails} />
      {/* Action Buttion  section  */}
      <ActionButtonSection business={businessDetails} />
      {/* Business Desciptipon section */}
      <BusinessDetailsDescritopn business={businessDetails} />
    </View>
  )
}