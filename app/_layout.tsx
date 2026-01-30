import { ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
export default function RootLayout() {
  const [fontLoaded] = useFonts({
    'appFontBold': require("./../assets/fonts/Montserrat-Bold.ttf"),
    'appFont': require("./../assets/fonts/Montserrat-Regular.ttf"),
    'appFontExtraBold': require("./../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  if (!fontLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <ClerkProvider>
    <Stack />
    </ClerkProvider>);
}
