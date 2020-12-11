import { Container, View,Header, Body, Title, Right, Left, Card, List, ListItem} from "native-base";
import React, {useContext,useEffect,useState} from "react";
import {StyleSheet,Text,Platform,FlatList,Dimensions} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
//import {Header} from "native-base"
import {ImagesContext} from "../context/ImagesContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import Image from 'react-native-scalable-image'

const {width, height} = Dimensions.get("window");


const HomeScreen = ({navigation}) => {
    const { images } = useContext(ImagesContext);
    const [image, setImage] = useState(null);
    const imagesContext = useContext(ImagesContext);
    const {addNewImage, refreshImages} = imagesContext;

    useEffect(() => {
        (async () => {
           
            const { status } = await ImagePicker.getCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          
        })();
      }, []);

    async function pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            base64:true,
            quality: 1,
          });
      
          console.log(result.uri);
      
          if (!result.cancelled) {

            try {
                let message = 'data:image/png;base64, ' + result.base64;
                //setImage(result.uri)
                const resultado = result.uri;
                addNewImage(resultado,refreshImages);
                {console.log(images)}
                refreshImages();
               

            } catch (error) {
                console.log(error);
            }
            

          }
    }

    return(
        
        <Container>
            <Header androidStatusBarColor="#333" style={{backgroundColor:"#fff"}}>
                <Left>
                  <Entypo name="add-to-list" size={24} color="black" onPress={pickImage} />
                </Left>
                <Body style={{backgroundColor:'#fff'}}>
                   <Text style={{borderBottomColor:"#fff",fontSize:20}}>Home</Text>
                </Body>
                <Right>
                    <MaterialCommunityIcons onPress={()=> navigation.navigate("camera")} name="camera-outline" size={30} color={'#000'} />
                </Right>
            </Header>

            <ScrollView>
              {console.log(images)}
              {images
                ? images.map((each) => (
                  <TouchableOpacity key={each.id.toString()} onPress={()=>{navigation.navigate("imageScreen",{id:each.id,uri:each.image})}}>
                    <Card  style={{width:width*0.85,alignSelf:"center"}}>
                       {console.log(each.image)}
                      <Image source={{uri : each.image}} width={width*0.85} style={{borderRadius:10}}/>
                    </Card>
                    </TouchableOpacity>
                  ))
                : null}
            
            </ScrollView>
        </Container>
        

    )

}

const styles = StyleSheet.create({

});


export default HomeScreen;