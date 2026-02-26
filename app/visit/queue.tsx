import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { PatientContext } from "../../src/context/PatientContext";

export default function Queue() {
  const { patient } = useContext(PatientContext);

  const currentToken = "A-10";
  const patientsAhead = 3;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Queue</Text>

      <Text>Your Token: {patient?.token}</Text>
      <Text>Current Token: {currentToken}</Text>
      <Text>Patients Ahead: {patientsAhead}</Text>
      <Text>Estimated Wait: {patientsAhead * 5} mins</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 }
});