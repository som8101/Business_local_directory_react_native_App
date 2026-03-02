import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Linking, Share, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../services/Colors';

/**
 * Renders the Profile screen UI.
 *
 * Displays a root View containing a Text element with the label "Profile".
 *
 * @returns A React element representing the Profile screen.
 */
export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: 'Explore',
      icon: 'compass-outline',
      path: '/(tabs)/Explore'
    },
    {
      id: 2,
      name: 'Favorite',
      icon: 'heart-outline',
      path: '/(tabs)/Favorite'
    },
    {
      id: 3,
      name: 'Share',
      icon: 'share-social-outline',
      path: 'share'
    },
    {
      id: 4,
      name: 'Contact us',
      icon: 'mail-outline',
      path: 'contact'
    },
    {
      id: 5,
      name: 'Logout',
      icon: 'log-out-outline',
      path: 'logout'
    }
  ]

  const onMenuPress = (item: any) => {
    if (item.path == 'logout') {
      signOut();
      return;
    }
    if (item.path == 'share') {
      Share.share({
        message: 'Download the app from Expo Go'
      })
      return;
    }
    if (item.path == 'contact') {
      Linking.openURL('mailto:help@google.com')
      return;
    }
    router.push(item.path);
  }

  return (
    <View>
      <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.primary }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
          <Ionicons name="information-circle-outline" size={35} color={Colors.White} />
        </View>
        <View style={{
          marginTop: 20,
          backgroundColor: Colors.White,
          borderRadius: 15,
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15
        }}>
          <Image source={{ uri: user?.imageUrl }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 99
            }}
          />
          <View>
            <Text style={{
              fontSize: 20,
              fontFamily: 'appFontBold',
            }}>{user?.fullName}</Text>
            <Text style={{
              fontSize: 16,
              fontFamily: 'appFont',
              color: Colors.Gray,
            }}>{user?.primaryEmailAddress?.emailAddress}</Text>
          </View>

        </View>
      </View>

      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={menuList}
          contentContainerStyle={{
            padding: 20
          }}
          style={{
            backgroundColor: Colors.White,
            marginHorizontal: 20,
            borderRadius: 15,
            paddingVertical: 10
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onMenuPress(item)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 10
              }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Ionicons name={item.icon as any} size={35} color={item.path == 'logout' ? '#ff4d4d' : Colors.primary} />
                <Text style={{
                  fontFamily: 'appFont',
                  fontSize: 20,
                  color: item.path == 'logout' ? '#ff4d4d' : 'black'
                }}>{item.name}</Text>
              </View>
              {item.path != 'logout' && <Ionicons name="chevron-forward" size={24} color="black" />}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}