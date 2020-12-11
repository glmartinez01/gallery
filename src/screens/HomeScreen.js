import { Container, View,Header, Body, Title, Right, Left, Card, List, ListItem} from "native-base";
import React, {useContext,useEffect,useState} from "react";
import {StyleSheet,Text,Platform,FlatList,Dimensions, StatusBar} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
//import {Header} from "native-base"
import {ImagesContext} from "../context/ImagesContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import Image from 'react-native-scalable-image'
import { color } from "react-native-reanimated";

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
    StatusBar.setTranslucent(true);
    return(
        
      <Container>
        <View>
          <View style={styles.triangle}/>
          <View style={styles.square}/>
        </View>
        <View>
          <View style={{position:'absolute', left:width*0.06, top:height*0.04}}>
            <Entypo name="add-to-list" size={24} color="#3c1e22" onPress={pickImage} /> 
          </View>
          <View style={{position:'absolute', left:width*0.25, top:height*0.04}}>
            <Text style={{fontSize:20,color:'#3c1e22'}}>Home</Text>
          </View>  
          <View style={{position:'absolute', right:width*0.06, top:height*0.04}}>
            <MaterialCommunityIcons onPress={()=> navigation.navigate("camera")} name="camera-outline" size={30} color={'#3c1e22'} />
          </View>
        </View>

        <View style={{alignItems:"center", justifyContent:"center", flex:1, marginTop:height*0.15}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {console.log(images)}
              {images
                ? images.map((each) => (
                  <TouchableOpacity key={each.id.toString()} onPress={()=>{navigation.navigate("imageScreen",{id:each.id,uri:each.image})}}>
                    <Card  style={{width:width*0.85, borderRadius:10, borderWidth:3, alignItems:'center'}}>
                       {console.log(each.image)}
                      <Image source={{uri : each.image}} width={width*0.85} style={{borderRadius:10}}/>
                    </Card>
                    </TouchableOpacity>
                  ))
                : <Text>Guarda algunas Fotos!!</Text>}
            </ScrollView>
          </View>
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
    borderTopWidth: height*0.17,
    borderLeftWidth: 0,
    borderRightWidth: height*0.17,
    borderBottomWidth: 0,
    borderTopColor: '#ffdbcf',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  square: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: '#ffdbcf',
    borderStyle: 'solid',
    borderTopWidth: height*0.055,
    borderLeftWidth: width,
    borderRightWidth:width,
    borderBottomWidth: height*0.055,
    borderTopColor: '#ffdbcf',
    borderLeftColor: '#ffdbcf',
    borderRightColor: '#ffdbcf',
    borderBottomColor: '#ffdbcf',
  },

});


export default HomeScreen;