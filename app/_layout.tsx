import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
export default function RootLayout() {
  const [fontLoaded] = useFonts({
    'appFontBold': require("./../assets/fonts/Montserrat-Bold.ttf"),
    'appFont': require("./../assets/fonts/Montserrat-Regular.ttf"),
    'appFontExtraBold': require("./../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  if (!fontLoaded) {
    return <ActivityIndicator />;
  }
  return <Stack />;
}
