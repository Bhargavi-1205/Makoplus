import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../src/components/AppButton";

export default function ChooseOption() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Patient Type</Text>

      <AppButton
        title="View Full Records"
        onPress={() => router.push("/auth/login")}
      />

      <AppButton
        title="Regular Patient"
        onPress={() => router.push("/patient/regular")}
      />

      <AppButton
        title="New Patient"
        onPress={() => router.push("/patient/newpatient")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
});