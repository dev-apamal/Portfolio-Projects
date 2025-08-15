import { Text, Pressable, Image, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";

const Chips = ({ title = "", imageUri, handlePress, item, active }) => {
  return (
    <Pressable
      className="flex-col items-center gap-2 p-4 self-start"
      onPress={() => handlePress(item)}
    >
      <Image
        source={{
          uri: imageUri,
        }}
        style={active ? styles.activeImage : styles.image}
        resizeMode="cover"
      />
      <Text
        className="text-sm text-gray-700"
        style={active ? styles.activeText : null}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 400,
  },
  activeImage: {
    width: 48,
    height: 48,
    borderRadius: 400,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  activeText: {
    fontWeight: "700",
  },
});

export default Chips;
