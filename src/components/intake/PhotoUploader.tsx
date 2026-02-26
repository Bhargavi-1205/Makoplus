import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
}

export default function PhotoUploader({ photos, onChange }: PhotoUploaderProps) {
  const handlePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 5,
        quality: 0.8,
      });
      if (!result.canceled) {
        const uris = result.assets.map((asset: ImagePicker.ImagePickerAsset) => asset.uri).slice(0, 5);
        onChange(uris);
      }
    } catch {
      Alert.alert('Image Picker', 'Image picker is unavailable on this device.');
    }
  };

  return (
    <View>
      <Pressable style={styles.zone} onPress={handlePick}>
        <Ionicons name="camera-outline" size={28} color={colors.muted} style={styles.camera} />
        <Text style={styles.primary}>Upload photos of the affected area</Text>
        <Text style={styles.secondary}>JPEG/PNG · Max 5 photos · 10MB each</Text>
      </Pressable>
      <View style={styles.previewRow}>
        {photos.map((uri) => (
          <View key={uri} style={styles.thumbWrap}>
            <Image source={{ uri }} style={styles.thumb} />
            <Pressable style={styles.remove} onPress={() => onChange(photos.filter((item) => item !== uri))}>
              <Text style={styles.removeText}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  camera: {
    marginBottom: 8,
  },
  primary: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: 'Inter_500Medium',
  },
  secondary: {
    marginTop: 4,
    fontSize: 11,
    color: colors.muted,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  previewRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  thumbWrap: {
    width: 60,
    height: 60,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  remove: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.deep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: colors.white,
    lineHeight: 18,
    fontSize: 12,
  },
});

