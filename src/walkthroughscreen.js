import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const walkthroughtitleList = [
  {
    id: 1,
    title: "Welcome",
    desc: "Check If You Have Skin Cancer In Real Time",
    icon: <Ionicons name="fitness" size={50} color="white" />,
  },

  {
    id: 2,
    title: "Step 1",
    desc: "Press 'Enter Patient Details' Button To Go To 'Enter Patient Details' Page",
    icon: (
      <MaterialCommunityIcons
        name="gesture-tap-button"
        size={50}
        color="white"
      />
    ),
  },

  {
    id: 3,
    title: "Step 2",
    desc: "Provide The Required Patient Details",
    icon: <MaterialCommunityIcons name="form-select" size={50} color="white" />,
  },

  {
    id: 4,
    title: "Step 3",
    desc: "Press 'Open Camera' Button To Take Picture Of Skin Lesion Or Press 'Open Gallery' Button To Select Picture Of Skin Lesion From Gallery",
    icon: <MaterialCommunityIcons name="camera" size={50} color="white" />,
  },

  {
    id: 5,
    title: "Step 4",
    desc: "Confirm The Patient Details Then Wait For Diagnosis",
    icon: <MaterialCommunityIcons name="note-check" size={50} color="white" />,
  },
];

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#68b6ef",
    marginBottom: 30,
  },
  textDesc: {
    fontSize: 17,
    color: "#ffff",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default function WalkthroughScreen({ navigation }) {
  let [pageState, setPageState] = useState(0);
  return (
    <>
      <Swiper
        showsButtons={false}
        activeDotColor="white"
        onIndexChanged={(index) => setPageState(index)}
        loop={false}
        activeDotStyle={{
          width: 15,
          height: 15,
          borderRadius: 7,
          marginRight: 10,
          marginLeft: 10,
        }}
        containerStyle={{ backgroundColor: "#68b6ef" }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 7,
          backgroundColor: "transparent",
          borderColor: "white",
          borderWidth: 1,
          marginRight: 10,
          marginLeft: 10,
        }}
        paginationStyle={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: height / 3,
        }}
      >
        {walkthroughtitleList.map((i) => {
          return (
            <View key={i.id} style={styles.slide1}>
              {i.icon}
              <Text style={styles.text}>{i.title}</Text>
              <Text style={styles.textDesc}>{i.desc}</Text>
            </View>
          );
        })}
      </Swiper>
      {pageState !== 0 ? (
        <View style={{ backgroundColor: "#68b6ef" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#efdb68",
              paddingHorizontal: 20,
              paddingVertical: 10,
              margin: 20,
            }}
            onPress={() => navigation.navigate("PatientDetail")}
          >
            <Text>Enter Patient Details</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: "#68b6ef", height: 80 }}></View>
      )}
    </>
  );
}
