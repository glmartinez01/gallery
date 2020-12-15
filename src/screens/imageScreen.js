import { Button, Container, Content, Footer, Left, Right, View,Toast } from "native-base";
import React, {useState,useContext,useEffect} from "react";
import {Header} from "native-base";
import {StyleSheet, Dimensions,Text,Platform,ToastAndroid,Alert,StatusBar, Modal} from "react-native";
import { AntDesign,Ionicons,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

import Image from 'react-native-scalable-image';
import { ceil } from "react-native-reanimated";
const {width, height} = Dimensions.get("window");

import {ImagesContext} from "../context/ImagesContext";

const imageScreen = ({route,navigation}) => {

    const {id,uri} = route.params;
    const imagesContext = useContext(ImagesContext);
    const {addNewImage, refreshImages,deleteImage} = imagesContext;
    const [open,setOpen] = useState(false);

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
        navigation.goBack();
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
                <View style={styles.triangle2}/>
            </View>
            <Header noShadow style={{backgroundColor:"#ffdbcf"}}>
                <StatusBar backgroundColor="#ffdbcf" />
                <Left>
                    <Ionicons name="ios-arrow-back" size={35} style={{margin:4,padding:15}} color="#3c1e22" onPress= {()=> navigation.goBack()} /> 
                </Left>
                <Right>
                    <AntDesign name="download" size={24} color="#3c1e22" onPress={savePicture} />
                </Right>
            </Header>
            <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                <Image source={{uri:uri}} width={width*0.7} onPress={()=>{setOpen(true)}}/>
            </View>
            <Footer noShadow style={{backgroundColor:"#ffdbcf"}}>
                <FontAwesome name="trash-o" size={40} color="#3c1e22" style={{position:"absolute", bottom:height*0.01, alignSelf:"center"}} onPress={twoButtonAlert} />
            </Footer>
            <Modal animationType="fade" transparent={true} visible={open}>
                <StatusBar backgroundColor="#000000aa" />
                <View style={{backgroundColor:"#000000aa", flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Image source={{uri:uri}} width={width*0.85} />
                    <Ionicons name="ios-close" size={70} color="white" style={{position:'absolute', right:15,top:0}} onPress={()=>setOpen(false)} />
                </View>
            </Modal>
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
      borderTopWidth: height*0.15,
      borderLeftWidth: 0,
      borderRightWidth: height*0.15,
      borderBottomWidth: 0,
      borderTopColor: '#ffdbcf',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    triangle2:{
        position: 'absolute',
        top: height*0.82,
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
  
});

export default imageScreen;
