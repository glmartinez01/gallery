import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet,Dimensions } from "react-native";
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
import Image from 'react-native-scalable-image'

// Importar el contexto de las notas
import { ImagesContext } from "../context/ImagesContext";

const {width, height} = Dimensions.get("window");

const ImagesByAlbumScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [theImages, setTheImages] = useState(null);
  const [status, setStatus] = useState(false);
  const [errorNote, setErrorNote] = useState(false);
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
    <View style={{alignItems:"center", justifyContent:"center", flex:1, marginTop:height*0.15}}>
            {id==1 ?
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
            :
            <ScrollView showsVerticalScrollIndicator={false}>
            {console.log(images)}
            {theImages
              ? theImages.map((each) => (
                <TouchableOpacity key={each.id.toString()} onPress={()=>{navigation.navigate("imageScreen",{id:each.id,uri:each.image})}}>
                  <Card  style={{width:width*0.85, borderRadius:10, borderWidth:3, alignItems:'center'}}>
                     {console.log(each.image)}
                    <Image source={{uri : each.image}} width={width*0.85} style={{borderRadius:10}}/>
                  </Card>
                  </TouchableOpacity>
                ))
              : <Text>Guarda algunas Fotos!!</Text>}
          </ScrollView>}
            
    </View>
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
});

export default ImagesByAlbumScreen;

