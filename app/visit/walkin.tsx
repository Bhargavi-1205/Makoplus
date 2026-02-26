import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../src/context/PatientContext";
import AppButton from "../../src/components/AppButton";

export default function WalkIn() {
  const router = useRouter();
  const { patient, setPatient } = useContext(PatientContext);

  useEffect(() => {
    const token = "A-" + Math.floor(Math.random() * 100);
    setPatient({ ...patient, token });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Walk-In Created Successfully</Text>

      <Text style={styles.token}>
        Your Token: {patient?.token}
      </Text>

      <AppButton
        title="Go to Queue"
        onPress={() => router.push("/queue")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20 },
  token: { fontSize: 22, fontWeight: "bold", marginBottom: 20 }
});