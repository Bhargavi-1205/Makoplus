import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";

export default function NewPatient() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>New Patient Registration</Text>

      <TextInput
        placeholder="Name"
        style={{ borderWidth:1, width:250, margin:5, padding:8 }}
      />

      <TextInput
        placeholder="Phone"
        style={{ borderWidth:1, width:250, margin:5, padding:8 }}
      />

      <Button
        title="Create Walk-In"
        onPress={() => router.push({ pathname: "/walkin" })}
      />
    </View>
  );
}