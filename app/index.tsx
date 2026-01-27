import Colors from "@/services/Colors";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const Navication= useNavigation();
  useEffect(() => {
Navication.setOptions({ headerShown: false })
    }, []);
  return (
    <View
      style={
        styles.container
      }
    >
      <Image source={require('./../assets/images/welcome.png')}
        style={{ width: '100%', height: 300, marginTop: 140, resizeMode: 'contain' }}
      />
      <Text style={[styles.heading, { marginTop: 15 }]}>Welcome To</Text>
      <Text style={styles.heading}>Business directory</Text>
      <View style={{
        padding: 20,
        backgroundColor: Colors.White,
        margin: 20,
        borderRadius: 20
      }}>
        <Text style={styles.h2Text}> Discover thousands of local business all in one place</Text>
        <View
        style={[  styles.Button, {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap :5
         }]}>
          <Image source={require('./../assets/images/google.png')}
           style={{ width: 25, height: 25, resizeMode: 'contain', }}  />
              <Text style={{
            textAlign: 'center',
            fontFamily: 'appFont',
            fontSize: 15,
          }}>Sign in With Google</Text>
        </View>
        <View
          style={[styles.Button, {
            backgroundColor: Colors.primary
            , borderColor: Colors.primary
          }]}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'appFont',
            fontSize: 15, color: Colors.White
          }}>Skip</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: '100%',
  },
  heading: {
    fontFamily: 'appFontBold',
    fontSize: 30,
    color: Colors.White,
    textAlign: 'center',
  },
  h2Text: {
    fontFamily: 'appFont',
    fontSize: 18,
    textAlign: 'center'
  },
  Button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 15,
    marginTop: 20
  }
})


