import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet,Dimensions,FlatList,StatusBar,Image } from "react-native";
import { Ionicons,Entypo } from '@expo/vector-icons';
import {
  Container,
  Content,
  Text,
  Textarea,
  Spinner,
  Button,
  View,
  Card
} from "native-base";
import * as Font from "expo-font";
//import Image from 'react-native-scalable-image'

// Importar el contexto de las notas
import { ImagesContext } from "../context/ImagesContext";

const {width, height} = Dimensions.get("window");

const ImagesByAlbumScreen = ({ route, navigation }) => {
  const { id,name } = route.params;
  const [theImages, setTheImages] = useState(null);
  const imagesContext = useContext(ImagesContext);
  const { image, getImageByAlbumId } = imagesContext;

  //Arreglo de imagenes original
  const { images } = useContext(ImagesContext);

  useEffect(() => {
    const getImages = () => {
      getImageByAlbumId(id);
    };

    getImages();

    if(image.length){
        setTheImages(image);
    }

  }, []);

//   const handlerSaveNote = async () => {
//     // Validar que la nota tiene valor
//     if (note) {
//       await addNewNote(note, refreshNotes);

//       // Regresar a la pantalla anterior
//       navigation.goBack();
//     } else {
//       setErrorNote(true);
//     }
//   };


  return (
    <Container >
        <StatusBar backgroundColor="#ffdbcf" />
        <View>
          <View style={styles.square}/>
        </View>
        <View>
          <View style={{position:'absolute', left:width*0.06, top:height*0.027}}>
          <Ionicons name="ios-arrow-back" size={30} color="#3c1e22" onPress= {()=> navigation.goBack()} />  
          </View>
          <View style={{position:'absolute', left:width*0.25, top:height*0.027}}>
            <Text style={{fontSize:20,color:'#3c1e22'}}>{name}</Text>
          </View>
          {id!=1?<View style={{position:'absolute', right:width*0.06, top:height*0.027}}>
                  <Ionicons name="ios-add" size={35} style={{position:'absolute',right:5}} color="black"/>
                </View>:null} 
          
        </View>
            {id==1 ?
            <FlatList showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={3}
            style={{borderRadius:1,marginTop:67}}
            data={images}
            keyExtractor={(item)=>item.id.toString()}
            ListEmptyComponent={<Text>No images found!</Text>}

            renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate("imageScreen",{id:item.id,uri:item.image})}}>
                            
                                <View style={{flex:1, alignItems:"center",marginTop:0}}>
                                  <Image  source={{uri : item.image}}
                                          style={{width:width/3,height:height/6}}
                                          />
                                </View>
                   
                        </TouchableOpacity>
                    )
                }
            }
            />
            :
            <FlatList showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={3}
            style={{borderRadius:1,marginTop:67}}
            data={theImages}
            keyExtractor={(item)=>item.id.toString()}
            ListEmptyComponent={<View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
                                  <Text>Agrega algunas fotos!</Text>
                                </View>}

            renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>{navigation.navigate("imageScreen",{id:item.id,uri:item.image})}}>
                            
                                <View style={{flex:1, alignItems:"center",marginTop:0}}>
                                  <Image  source={{uri : item.image}}
                                          style={{width:width/3,height:height/6}}
                                          />
                                </View>
                   
                        </TouchableOpacity>
                    )
                }
            }
            />}
            
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  note: {
    borderColor: "black",
    marginBottom: 10,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  triangle: {
    position: 'absolute',
    right: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderTopWidth: height*0.16,
    borderLeftWidth: 0,
    borderRightWidth: height*0.16,
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
    width: width,
    height: 0,
    backgroundColor: '#ffdbcf',
    borderStyle: 'solid',
    borderTopWidth: height*0.048,
    borderBottomWidth: height*0.048,
    borderTopColor: '#ffdbcf',
    borderBottomColor: '#ffdbcf',
  },
});

export default ImagesByAlbumScreen;

