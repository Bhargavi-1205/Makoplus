import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";

export default function RegularPatient() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Enter Name + DOB</Text>
      <TextInput placeholder="Name" style={{borderWidth:1, width:200, margin:5}}/>
      <TextInput placeholder="DOB" style={{borderWidth:1, width:200, margin:5}}/>

      <Button title="Profile Linked"
      onPress={() => router.push({ pathname: "/followup" })}
      />
    </View>
  );
}