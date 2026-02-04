import Colors from "@/services/Colors";
import { axiosClient } from "@/services/GlobaiApi";
import { useSSO, useUser } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import { useNavigation, useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
WebBrowser.maybeCompleteAuthSession()
export default function Index() {
  useWarmUpBrowser()
  const { startSSOFlow } = useSSO()
  const router = useRouter();
  const user = useUser();
  console.log(user);
  const Navication = useNavigation();
  useEffect(() => {
    Navication.setOptions({ headerShown: false })
  }, []);

  useEffect(() => {
    user && createNewUser();
  }, [user]);
  const createNewUser = async () => {
    try {
      const result = await axiosClient.post('/user-lists', {
        data: {
          fullName: user.user?.fullName,
          email_id: user.user?.primaryEmailAddress?.emailAddress,
        }
      })
      console.log(result.data);
      router.replace('/(tabs)/Home');
    } catch (e) {
      console.log(e);
      ///-------------------------------
      // router.replace('/(tabs)/Home');
      //  router.push('/(tabs)/Home');
      
    }

  }

  const onPress = useCallback(async () => {
    try {

      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "localdirectory",
        path: "sso-callback",
      });
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              // Navigate to Home screen 

              return
            }

            // Navigate to Home screen 
            router.push('/(tabs)/Home')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])
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
        <TouchableOpacity
          onPress={onPress}
          style={[styles.Button, {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5
          }]}>
          <Image source={require('./../assets/images/google.png')}
            style={{ width: 25, height: 25, resizeMode: 'contain', }} />
          <Text style={{
            textAlign: 'center',
            fontFamily: 'appFont',
            fontSize: 15,
          }}>Sign in With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/Home')}
          style={[styles.Button, {
            backgroundColor: Colors.primary
            , borderColor: Colors.primary
          }]}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'appFont',
            fontSize: 15, color: Colors.White
          }}>Skip</Text>
        </TouchableOpacity>
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


