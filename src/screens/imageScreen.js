import { Button, Container, Content, Footer, Left, Right, View,Toast } from "native-base";
import React, {useState,useContext,useEffect} from "react";
import {Header} from "native-base";
import {StyleSheet, Dimensions,Text,Platform,ToastAndroid,Alert} from "react-native";
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

            
            <View>
                <View style={styles.triangle}/>
                
                <View style={styles.square}/>
                <View style={styles.triangle2}/>
                
                <View style={styles.square2}/>
            </View>
            <View>
                <View style={{position:'absolute', left:width*0.06, top:height*0.04}}>
                    <Ionicons name="ios-arrow-back" size={35} color="#3c1e22" onPress= {()=> navigation.goBack()} /> 
                </View>
                
                <View style={{position:'absolute', right:width*0.06, top:height*0.04}}>
                    <AntDesign name="download" size={24} color="#3c1e22" onPress={savePicture} />
                </View>
            </View>
            <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                <Image source={{uri:uri}} width={width*0.7} />
            </View>
            <Footer style={{backgroundColor:"#ffdbcf"}}>
                <MaterialCommunityIcons name="trash-can-outline" size={50} color="#3c1e22" style={{position:"absolute", bottom:height*0.01, alignSelf:"center"}} onPress={twoButtonAlert} />
            </Footer>
            
        </Container>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffdbcf',
    },
    triangle: {
      position: 'absolute',
      right: 0,
      left: 0,
      width: 0,
      height: 0,
      backgroundColor: 'white',
      borderStyle: 'solid',
      borderTopWidth: height*0.19,
      borderLeftWidth: 0,
      borderRightWidth: height*0.19,
      borderBottomWidth: 0,
      borderTopColor: '#ffdbcf',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    square: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: 0,
      backgroundColor: '#ffdbcf',
      borderStyle: 'solid',
      borderTopWidth: height*0.055,
      borderBottomWidth: height*0.055,
      borderTopColor: '#ffdbcf',
      borderBottomColor: '#ffdbcf',
    },
    triangle2:{
        position: 'absolute',
        top: height*0.85,
        left: width*0.67,
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopWidth: height*0.19,
        borderLeftWidth: 0,
        borderRightWidth: height*0.19,
        borderBottomWidth: 0,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: '#ffdbcf',
        borderBottomColor: 'transparent',
    },
    square2: {
        position: 'absolute',
        top: height*0.95,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: '#ffdbcf',
        borderStyle: 'solid',
        borderTopWidth: height*0.055,
        borderLeftWidth: width,
        borderRightWidth:width,
        borderBottomWidth: height*0.055,
        borderTopColor: '#ffdbcf',
        borderLeftColor: '#ffdbcf',
        borderRightColor: '#ffdbcf',
        borderBottomColor: '#ffdbcf',
    },
    triangle3:{
        position: 'absolute',
        right: 0,
        left: width*0.67,
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopWidth: height*0.19,
        borderLeftWidth: height*0.19,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopColor: '#ffdbcf',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    triangle4:{
        position: 'absolute',
        top: height*0.82,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopWidth: height*0.19,
        borderLeftWidth: height*0.19,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopColor: 'transparent',
        borderLeftColor: '#ffdbcf',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
    },
  
});


export default imageScreen;

{/* <View>
                <MaterialCommunityIcons name="trash-can-outline" size={50} color="black" style={{alignSelf:"center"}} onPress={twoButtonAlert} />
            </View> */}