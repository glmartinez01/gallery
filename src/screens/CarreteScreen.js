import { Container, View,Header,Body,Card } from "native-base";
import React from "react";
import {StyleSheet,Text,Dimensions} from "react-native";

const {width, height} = Dimensions.get("window")

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
            <View style={{alignItems:"center"}}>
                <View style={{flexDirection:'row'}}>
                    <Card style={styles.g1}>
                    </Card>
                    <Card style={styles.g2}>
                    </Card>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Card style={styles.g3}>
                    </Card>
                    <Card style={styles.g4}>
                    </Card>
                </View>
            </View>
                        
                       
                 
            
        </Container>

    )

}

const styles = StyleSheet.create({
    g1:{
        borderColor:'#000',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10 ,
        height:height*0.27, 
        width:width*0.45,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
    g2:{
        borderColor:'#000',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10 ,
        height:height*0.27, 
        width:width*0.45,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
    g3:{
        borderColor:'#000',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 0 ,
        height:height*0.27, 
        width:width*0.45,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
    g4:{
        borderColor:'#000',
        backgroundColor:'#fff',
        borderWidth:3, 
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 10 ,
        height:height*0.27, 
        width:width*0.45,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
});


export default CarreteScreen;