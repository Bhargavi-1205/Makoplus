import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

interface Props {
  title: string;
  onPress: () => void;
}

export default function AppButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.terra,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});

