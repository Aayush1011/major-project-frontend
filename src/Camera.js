import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { utils } from "./styles";
const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function VideoScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFlash, setIsFlash] = useState(false);
  const [type, setType] = useState(0);
  const cameraRef = useRef();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();

      if (cameraPermissions.status === "granted") {
        setHasPermission(true);
      }
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        props.navigation.navigate("Save", { source, imageSource: null, type });
      }
    }
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const renderCaptureControl = () => (
    <View>
      <View
        style={{
          justifyContent: "space-evenly",
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          disabled={!isCameraReady}
          onPress={() => setIsFlash(!isFlash)}
        >
          <Feather
            style={utils.margin15}
            name={"zap"}
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
          <Feather
            style={utils.margin15}
            name="rotate-cw"
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!isCameraReady}
          onPress={takePicture}
          style={styles.capturePicture}
        />
        <TouchableOpacity onPress={() => props.navigation.navigate("Gallery")}>
          <Feather
            style={utils.margin15}
            name={"image"}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
    >
      <View style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
        {isFocused ? (
          <Camera
            ref={cameraRef}
            style={{ flex: 1, aspectRatio: 1 / 1, height: WINDOW_WIDTH }}
            type={cameraType}
            flashMode={
              isFlash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            ratio={"1:1"}
            onCameraReady={onCameraReady}
          />
        ) : null}
      </View>

      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          },
        ]}
      >
        <View>{renderCaptureControl()}</View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#000000",
  },

  capture: {
    backgroundColor: "red",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  capturePicture: {
    borderWidth: 6,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
});
