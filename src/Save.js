import { Feather } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { container, navbar, text, utils } from "./styles";
import { Logs } from "expo";

Logs.enableExpoCliLogging();

function Save(props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    {
      !uploading &&
        props.navigation.setOptions({
          headerRight: () => (
            <Feather
              style={navbar.image}
              name="check"
              size={24}
              color="green"
              onPress={() => {
                uploadImage();
              }}
            />
          ),
        });
    }
  }, [uploading]);

  const uploadImage = async () => {
    if (uploading) {
      return;
    }
    setUploading(true);
    await classifyImage(props.route.params.source);
  };

  const classifyImage = async (image) => {
    if (image == "default") {
      return "";
    }
    const newData = new FormData();
    newData.append("image_attachment", {
      uri: image,
      type: "image/jpg",
      name: "image.jpg",
    });
    const classification = await fetch("http://192.168.1.70:5000", {
      method: "post",
      body: newData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    let responseJson = await classification.json();

    if (responseJson) {
      setUploading(false);

      if (responseJson.result === "no skin detected") {
        props.navigation.navigate("ResultScreen", { skinDetected: false });
      } else if (responseJson.result === "False") {
        props.navigation.navigate("ResultScreen", {
          skinDetected: true,
          cancerDetected: false,
        });
      } else {
        props.navigation.navigate("ResultScreen", {
          skinDetected: true,
          cancerDetected: true,
        });
      }
    }
    return;
  };

  return (
    <View style={[container.container, utils.backgroundWhite]}>
      {uploading ? (
        <View
          style={[
            container.container,
            utils.justifyCenter,
            utils.alignItemsCenter,
          ]}
        >
          <ActivityIndicator style={utils.marginBottom} size="large" />
          <Text style={[text.bold, text.large]}>Diagnosis in progress...</Text>
        </View>
      ) : (
        <View style={[container.container]}>
          <View
            style={[
              container.container,
              utils.backgroundWhite,
              utils.padding15,
            ]}
          >
            <View>
              <Image
                image={container.image}
                source={{ uri: props.route.params.source }}
                style={{ aspectRatio: 1 / 1, backgroundColor: "black" }}
              />
            </View>
          </View>
          <Snackbar
            visible={error}
            duration={2000}
            onDismiss={() => setError(false)}
          >
            Something Went Wrong!
          </Snackbar>
        </View>
      )}
    </View>
  );
}

export default Save;
