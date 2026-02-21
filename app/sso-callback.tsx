import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function SSOCallback() {
    const router = useRouter();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if (isSignedIn) {
            router.replace("/(tabs)/Home");
        }
    }, [isSignedIn]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
