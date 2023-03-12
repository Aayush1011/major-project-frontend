import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

const preventiveMeasures = [
  { id: 1, text: "Stay in the shade." },
  { id: 2, text: "Wear clothing that covers your arms and legs." },
  {
    id: 3,
    text: "Wear a hat with a wide brim to shade your face, head, ears, and neck.",
  },
  {
    id: 4,
    text: "Wear sunglasses that wrap around and block both UVA and UVB rays.",
  },
  {
    id: 5,
    text: "Use a broad spectrum sunscreen with a sun protection factor (SPF) of 15 or higher.",
  },
];

const styles = StyleSheet.create({
  text: {
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 31,
    textAlign: "center",
    color: "white",
  },
});

export default function ResultScreen(props) {
  const diagnosis = props.route.params.detected
    ? "Please be careful Melanoma Skin Cancer Detected"
    : "You are safe Melanoma Skin Cancer Not Detected";
  return (
    <View
      style={{
        backgroundColor: "#68b6ef",
        paddingVertical: 20,
        paddingHorizontal: 10,
        height: height,
      }}
    >
      <Text
        style={[
          styles.text,
          {
            marginTop: 10,
            marginBottom: 48,
            fontSize: 30,
          },
        ]}
      >
        {diagnosis}
      </Text>
      <Text
        style={[
          styles.text,
          {
            marginBottom: 36,
            fontSize: 28,
          },
        ]}
      >
        Follow these preventive measures
      </Text>
      <FlatList
        data={preventiveMeasures}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.text,
              {
                fontSize: 20,
              },
            ]}
          >
            {`\u2022 ${item.text}`}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#efdb68",
          paddingHorizontal: 20,
          paddingVertical: 10,
          margin: 20,
          marginBottom: 100,
        }}
        onPress={() => props.navigation.navigate("PatientDetail")}
      >
        <Text>Scan Next Lesion</Text>
      </TouchableOpacity>
    </View>
  );
}
