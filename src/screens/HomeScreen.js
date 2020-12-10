import { Container, View,Header, Body, Title, Right, Left} from "native-base";
import React from "react";
import {StyleSheet,Text} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import {Header} from "native-base"


const HomeScreen = ({navigation}) => {

    return(
        
        <Container>
            <Header androidStatusBarColor="#333" style={{backgroundColor:"#fff"}}>
                <Body style={{backgroundColor:'#fff'}}>
                   <Text style={{borderBottomColor:"#fff",fontSize:20}}>Home</Text>
                </Body>
                <Right>
                    <MaterialCommunityIcons onPress={()=> navigation.navigate("camera")} name="camera-outline" size={30} color={'#000'} />
                </Right>
            </Header>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>Pantalla de Inicio</Text>
            </View>
        </Container>
        

    )

}

const styles = StyleSheet.create({

});


export default HomeScreen;