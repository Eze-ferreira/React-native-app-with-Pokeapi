import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#D32F2F" }, 
        headerTintColor: "#FFF", 
        headerTitleStyle: { 
          fontWeight: "bold", 
          fontSize: 20 
        },
        headerShadowVisible: false, 
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokédex" }} />
    </Stack>
  );
}
