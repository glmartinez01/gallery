import { Container, View,Header, Body, Title} from "native-base";
import React from "react";
import {StyleSheet,Text} from "react-native";
//import {Header} from "native-base"


const HomeScreen = () => {

    return(

        <Container>
            <Header androidStatusBarColor="#aaa" style={{backgroundColor:"#fff"}}>
                <Body style={{backgroundColor:'#fff',alignItems:"center"}}>
                   <Text style={{borderBottomColor:"#fff",fontSize:20}}>Home</Text>
                </Body>
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