import { Container, View,Header,Body } from "native-base";
import React from "react";
import {StyleSheet,Text} from "react-native";

const CarreteScreen = () => {

    return(

        <Container>
            <Header androidStatusBarColor="#aaa" style={{backgroundColor:"#fff"}}>
                <Body style={{backgroundColor:'#fff',alignItems:"center"}}>
                   <Text style={{borderBottomColor:"#fff",fontSize:20}}>Images</Text>
                </Body>
            </Header>
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <Text>Pantalla de Imagenes</Text>
            </View>
        </Container>

    )

}

const styles = StyleSheet.create({

});


export default CarreteScreen;