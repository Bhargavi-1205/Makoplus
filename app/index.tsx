import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../src/components/AppButton";
import { colors } from "../src/theme/colors";

export default function ScanQR() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Clinic QR Check-In</Text>
        <Text style={styles.subtitle}>
          Please scan the clinic QR code to continue
        </Text>

        <AppButton
          title="Scan QR Code"
          onPress={() => router.push("/checkin")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
});