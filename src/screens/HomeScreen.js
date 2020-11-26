import { Container, View } from "native-base";
import React from "react";
import {StyleSheet,Text} from "react-native";

const HomeScreen = () => {

    return(

        <Container style={{alignItems:"center",justifyContent:"center"}}>
            <View>
                <Text>Pantalla de Inicio</Text>
            </View>
        </Container>

    )

}

const styles = StyleSheet.create({

});


export default HomeScreen;