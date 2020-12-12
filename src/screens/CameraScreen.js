import { Container, View,Header, Body, Title, Left, Right, Footer, Content, FooterTab,Toast} from "native-base";
import React, { useState, useEffect, useRef,useContext } from 'react';
import {StyleSheet,Text, TouchableOpacity,Modal,ToastAndroid,Platform,Dimensions,StatusBar} from "react-native";
import { Ionicons,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera, FlashMode } from 'expo-camera';
import { log } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Image from 'react-native-scalable-image'

import {ImagesContext} from "../context/ImagesContext"
const {width, height} = Dimensions.get("window")

const CameraScreen = ({navigation}) => {

        const [hasPermission, setHasPermission] = useState(null);
        const camRef = useRef(null);
        const imagesContext = useContext(ImagesContext);
        const {addNewImage,refreshImages} = imagesContext
        const [type, setType] = useState(Camera.Constants.Type.back);
        const [album,setAlbum] = useState(null);
        const [capturedPhoto,setCapturedPhoto] = useState(null);
        const [open,setOpen] = useState(false);
        const [flash, setFlashMode] = React.useState('off')
        

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
        //Permisos
        useEffect(() => {
            (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            })();

            (async () => {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                setHasPermission(status === 'granted');
                })();
        }, []);

        //Tomar la foto
        async function takePicture(){
            if(camRef){
                const data = await camRef.current.takePictureAsync();
                setCapturedPhoto(data.uri);
                setOpen(true);
                console.log(data);
            }
        }

        //Salvar la foto a galeria
        const savePicture = () => {
            // Validar que la imagen tiene valor
            if (capturedPhoto) {
              addNewImage(capturedPhoto,album,refreshImages);

              // Refrescar las imagenes
              refreshImages();

              // Regresar a la pantalla anterior
              setOpen(false);
              navigation.goBack();
            } else {
              setErrorNote(true);
            }
        };
        // async function savePicture(){
        //     const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
        //     const album = await MediaLibrary.createAlbumAsync("Gallery",asset,false)
        //     .then(()=>{
        //         poptoast();
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
        // }

        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        };

        // Estados del flash
        const _handleFlash = () => {
            if (Platform.OS != 'android') {
                if (flash === 'on') {
                    setFlashMode('auto')
                    Toast.show({text: 'Flash: Auto',duration: 1500});
                }else if (flash === 'auto') {
                    setFlashMode('off')
                    Toast.show({text: 'Flash: Off',duration: 1500});
                }else{ 
                    setFlashMode('on')
                    Toast.show({text: 'Flash: On',duration: 1500});
                }
            } else {
                if (flash === 'on') {
                    setFlashMode('auto')
                    ToastAndroid.show('Flash: Auto', ToastAndroid.LONG);
                } else if (flash === 'auto') {
                    setFlashMode('off')
                    ToastAndroid.show('Flash: Off', ToastAndroid.LONG);
                } else {
                    setFlashMode('on')
                    ToastAndroid.show('Flash: On', ToastAndroid.LONG);
                }
            }
        }

        // Orientacion de la camara
        const _handletap = () => {
            if (type === 'front') {
                setType('back')
            }else {
                setType('front')
            }
        }
        
        return (
            <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
            <Camera style={{ flex: 1 }} type={type} ratio={"16:9"} ref={camRef} flashMode={flash} autoFocus={'on'}>
                <Header noShadow androidStatusBarColor="#333"
                    style={{
                        backgroundColor: 'transparent',
                    }}>
                    <Left>
                        <Ionicons name="ios-arrow-back" size={35} color="white" style={{margin:5,padding:15}} onPress= {()=> navigation.goBack()} />
                    </Left>
                    <TouchableOpacity onPress= {_handleFlash} style={{alignItems:"center", justifyContent:"center", marginLeft:'20%'}}>
                        {flash === 'on' ?
                            <MaterialCommunityIcons name="flash" size={35} color="white" />:
                            flash === 'auto' ? <MaterialCommunityIcons name="flash-auto" size={35} color="white" />:
                            <MaterialCommunityIcons name="flash-off" size={35} color="white" />
                        }
                    </TouchableOpacity>
                    <Right>
                        {type === 'front' ? 
                            <MaterialCommunityIcons name="camera-account" size={35} onPress={_handletap} color="white" /> 
                            : <MaterialCommunityIcons name="camera" size={35} onPress={_handletap} color="white" />
                        } 
                    </Right>
                </Header>
                <Content></Content>
                <Footer style={{alignSelf:"center",backgroundColor:"transparent",height:100}}>
                    <TouchableOpacity onPress={takePicture}>
                        <MaterialCommunityIcons name = "circle-outline" size={80} color="#fff"  style={{borderRadius:30,padding:10}} />
                    </TouchableOpacity>              
                </Footer>
            </Camera>

            {capturedPhoto &&
                <Modal animationType="slide" transparent={false} visible={open}>
                    <Ionicons name="ios-arrow-back" size={35} color="white" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>setOpen(false)} />
                    
                    <AntDesign name="upload" size={30} style={{position:'absolute', zIndex:2,marginLeft:'85%',margin:5,padding:10}} onPress={()=>{savePicture(); setOpen(false)}} color="white" />
                    
                    <View style={{flex:1, justifyContent:"center",alignItems:"center",position:'absolute', zIndex:1}}>
                        <Image source={{uri: capturedPhoto}} height={height}/>
                    </View>
                </Modal>
            }
            </SafeAreaView>
           
        );

}

const styles = StyleSheet.create({
    icon:{
        marginLeft:5
    }
});


export default CameraScreen;