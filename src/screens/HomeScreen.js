import { Container, View,Header, Body, Title} from "native-base";
import React from "react";
import {StyleSheet,Text} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import {Header} from "native-base"


const HomeScreen = ({navigation}) => {

    return(

        <Container>
            <Header androidStatusBarColor="#aaa" style={{backgroundColor:"#fff"}}>
                <Body style={{backgroundColor:'#fff',alignItems:"center"}}>
                   <Text style={{borderBottomColor:"#fff",fontSize:20}}>Home</Text>
                </Body>
            </Header>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>Pantalla de Inicio</Text>
                <MaterialCommunityIcons onPress={()=> navigation.navigate("camera")} name="camera-outline" size={50} color={'#000'} />
                
            </View>
        </Container>

    )

}

const styles = StyleSheet.create({

});


export default HomeScreen;