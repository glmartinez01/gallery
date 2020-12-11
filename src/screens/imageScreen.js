import { Button, Container, Content, Footer, Left, Right, View,Toast } from "native-base";
import React, {useState,useContext,useEffect} from "react";
import {Header} from "native-base";
import {Dimensions,Text,Platform,ToastAndroid,Alert} from "react-native";
import { AntDesign,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import Image from 'react-native-scalable-image';
import { ceil } from "react-native-reanimated";
const {width, height} = Dimensions.get("window");

import {ImagesContext} from "../context/ImagesContext";

const imageScreen = ({route,navigation}) => {

    const {id,uri} = route.params;
    const imagesContext = useContext(ImagesContext);
    const {addNewImage, refreshImages,deleteImage} = imagesContext;

    const poptoast = () => {
        if (Platform.OS != 'android') {
            Toast.show({
                text: 'Photo saved to this device',
                duration: 1500
              });
        } else {
            ToastAndroid.show('Photo saved to this device', ToastAndroid.LONG);
        }
    };

    async function savePicture(){
            const asset = await MediaLibrary.createAssetAsync(uri)
            const album = await MediaLibrary.createAlbumAsync("Gallery",asset,false)
            .then(()=>{
                poptoast();
            })
            .catch(error=>{
                console.log(error)
            })
        }

    const handlerDelete=()=>{
        deleteImage(id,refreshImages);
        refreshImages();
        navigation.goBack()
    }

    const twoButtonAlert = () =>
    Alert.alert(
      "¿Desea borrar esta imagen?",
      "No hay vuelta atras",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: handlerDelete }
      ],
      { cancelable: true }
    );

    return(

        <Container>
            <Header noShadow style={{backgroundColor:"transparent"}} androidStatusBarColor={"#aaa"}>
                <Left>
                    <Ionicons name="ios-arrow-back" size={35} color="black" style={{margin:5,padding:15}} onPress= {()=> navigation.goBack()} />
                </Left>
                <Right>
                    <AntDesign name="download" size={24} color="black" onPress={savePicture} />
                </Right>
            </Header>
            <Content style={{alignSelf:"center",marginTop:20}}>
                <Image source={{uri:uri}} width={width*0.7} />
            </Content>
            <Footer style={{backgroundColor:"transparent"}}>
                <MaterialCommunityIcons name="trash-can-outline" size={50} color="black" style={{alignSelf:"center"}} onPress={twoButtonAlert} />
            </Footer>
        </Container>

    )



}


export default imageScreen;