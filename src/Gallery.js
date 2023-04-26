import { Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from "react-native";
import { container, utils } from "./styles";
const WINDOW_WIDTH = Dimensions.get("window").width;

export default function Gallery(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryScrollRef, setGalleryScrollRef] = useState(null);
  const [galleryPickedImage, setGalleryPickedImage] = useState(null);
  useEffect(() => {
    (async () => {
      const galleryPermissions = await MediaLibrary.requestPermissionsAsync();

      if (galleryPermissions.status === "granted") {
        const albums = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: true,
        });
        const album = albums.find((a) => a.title === "Skin Cancer");
        const getPhotos = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["photo"],
          album,
        });
        setGalleryItems(getPhotos);
        setGalleryPickedImage(getPhotos.assets[0]);
        setHasPermission(true);
      }
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    })();
  }, []);
  const handleGoToSaveOnGalleryPick = async () => {
    const loadedAsset = await MediaLibrary.getAssetInfoAsync(
      galleryPickedImage
    );
    let imageSource = null;

    props.navigation.navigate("Save", {
      source: loadedAsset.localUri,
      // type,
      imageSource,
    });
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to gallery</Text>;
  }
  return (
    <ScrollView
      ref={(ref) => setGalleryScrollRef(ref)}
      style={[container.container, utils.backgroundWhite]}
      horizontal={false}
    >
      <View style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
        <Image
          style={{ flex: 1, aspectRatio: 1 / 1, height: WINDOW_WIDTH }}
          source={{ uri: galleryPickedImage.uri }}
          ratio={"1:1"}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: 20,
          marginVertical: 10,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "gray",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginRight: 15,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={() => handleGoToSaveOnGalleryPick()}
        >
          <Text
            style={{ fontWeight: "bold", color: "white", paddingBottom: 1 }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "gray",
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "black",
          }}
          onPress={() => props.navigation.navigate("Camera")}
        >
          <Feather
            style={{ padding: 10 }}
            name={"camera"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View horizontal={true} style={({ flex: 1 }, [utils.borderTopGray])}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={galleryItems.assets}
          scrollEnabled={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[container.containerImage, utils.borderWhite]}
              onPress={() => {
                galleryScrollRef.scrollTo({ x: 0, y: 0, animated: true });
                setGalleryPickedImage(item);
              }}
            >
              <Image style={container.image} source={{ uri: item.uri }} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}
