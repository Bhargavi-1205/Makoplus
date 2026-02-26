import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../src/components/AppButton";

export default function CheckIn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clinic Check-In</Text>

      <Text style={styles.info}>
        You have successfully scanned the clinic QR code.
      </Text>

      <AppButton
        title="Proceed to Patient Options"
        onPress={() => router.push("/choose")}
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  info: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
});