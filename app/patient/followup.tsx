import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function FollowUp() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Select Follow-Up Appointment</Text>

      <Button
        title="Proceed to Walk-In"
        onPress={() => router.push({ pathname: "/walkin" })}
      />
    </View>
  );
}