import { Container, View,Header, Body, Title, Left, Right} from "native-base";
import React, { useState, useEffect } from 'react';
import {StyleSheet,Text, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import {Header} from "native-base"
import { Camera } from 'expo-camera';

const CameraScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
        const [type, setType] = useState(Camera.Constants.Type.back);

        useEffect(() => {
            (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            })();
        }, []);

        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            
            <Camera style={{ flex: 1 }} type={type} ratio={"16:9"}>
                <Header noShadow androidStatusBarColor="#aaa"
                    style={{
                        
                        backgroundColor: 'transparent',
                        
                    }}>
                    <Left>
                        <Ionicons name="ios-arrow-back" size={35} color="white" style={{margin:5,padding:15}} onPress= {()=> navigation.goBack()} />
                    </Left>
                    <Right>
                        <MaterialCommunityIcons name="camera-retake" size={35} onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                            }} color="white" />
                    </Right>
                    
                    
                </Header>
            </Camera>
           
        );

}

const styles = StyleSheet.create({
    icon:{
        marginLeft:5
    }
});


export default CameraScreen;
