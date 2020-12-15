import React, { useContext, useEffect, useState,useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet,Dimensions,FlatList,StatusBar,Image,Modal,TouchableOpacity,Alert } from "react-native";
import { Ionicons,AntDesign,MaterialIcons,MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { Container,Content,Text,Textarea,Spinner,Button,View,Card } from "native-base";

// Importar el contexto de las albumnes
import { ImagesContext } from "../context/ImagesContext";
import { AlbumsContext } from "../context/AlbumsContext";

const {width, height} = Dimensions.get("window");

const ImagesByAlbumScreen = ({ route, navigation }) => {
  const { id,name } = route.params;
  const [theImages, setTheImages] = useState(null);
  const [open,setOpen] = useState(false);
  const [abrir,setAbrir] = useState(false);
  const imagesContext = useContext(ImagesContext);
  const { image, getImageByAlbumId,modifyImage,refreshImages } = imagesContext;
  const albumsContext = useContext(AlbumsContext);
  const {deleteAlbum, refreshAlbums} = albumsContext;
  const [selected,setSelected] = useState([]);
  
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshImages();
    wait(5).then(() => setRefreshing(false));
  }, []);


  const twoButtonAlert = () =>
  Alert.alert(
    "¿Desea borrar este album?",
    "Las imagenes no se eliminaran.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: albumDel }
    ],
    { cancelable: true }
  );


  //Arreglo de imagenes original
  const { images } = useContext(ImagesContext);

  useEffect(() => {
    const getImages = () => {
      getImageByAlbumId(id);
    };
    getImages();
    if(image.length){
        setTheImages(image);
    }else{
      setTheImages(null);
    }
  }, [id,image]);

  //Eliminar el album 
  const albumDel =()=>{
    if(theImages){
      theImages.forEach(element => {
        modifyImage(null,element.id, refreshImages);
      });
    }
    deleteAlbum(id,refreshAlbums);
    refreshAlbums();
    refreshImages();
    navigation.goBack();
  }
  //Eliminar el imagenes 
  const handlerRemoveImage = (array) => {
    array.forEach(element => {
      modifyImage(null,element, refreshImages);
    });
    setSelected([])
    refreshImages();
  };

  useEffect(() => {
    onRefresh();
  }, []);


  const handlerSaveImage = (array) => {
      array.forEach(element => {
        modifyImage(id,element, refreshImages);
      });
      refreshImages();
      setSelected([]);
      // Regresar a la pantalla anterior
      navigation.goBack();
   
  };
    const handlerCheck = (item) =>{
    
    if(selected.includes(item.id)){
      for( var i = 0; i < selected.length; i++){ 

        if ( selected[i] === item.id) { 

            selected.splice(i, 1); 
        }
      }
    }else{
        selected.push(item.id);
      }
      onRefresh();
      console.log(selected);
    }

  return (
    <Container >
        <StatusBar backgroundColor="#008577" />
        <View>
          <View style={styles.square}/>
        </View>
        <View>
          <View style={{position:'absolute', left:width*0.05, top:height*0.01}}>
            <Ionicons style={{padding:10}} name="ios-arrow-back" size={30} color="black" onPress= {()=> navigation.goBack()} />  
          </View>
          <View style={{position:'absolute', left:width*0.25, top:height*0.027}}>
            <Text style={{fontSize:20,color:'black'}}>{name}</Text>
          </View>
          
          {(id!==1 && id!==2) ? 
            <View style={{position:'absolute', right:width*0.06, top:height*0.027}}>
                <Ionicons name="ios-add" size={35} style={{position:'absolute',right:5}} color="black" onPress={() => setOpen(true)}/>
            </View>
          :null} 
          {(id!==1 && id!==2) ?
            <View style={{position:'absolute', right:width*0.30, top:height*0.027}}>
              <FontAwesome name="trash-o" size={30} color="black" onPress= {twoButtonAlert} />
            </View>
            :null} 
          {(id!==1 && id!==2) ?
            <View style={{position:'absolute', right:width*0.17, top:height*0.027}}>
              <AntDesign name="minuscircleo" size={30} color="black" onPress={() => setAbrir(true)}/>
            </View>
          :null}
          
        </View>
            {id==1 ?
            <FlatList showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={3}
            style={{marginTop:67}}
            data={images}
            keyExtractor={(item)=>item.id.toString()}
            ListEmptyComponent={<Text>No se econtraron Imagenes!</Text>}

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
            style={{marginTop:67}}
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
            <Modal animationType="fade" transparent={true} visible={open}>
                <StatusBar backgroundColor="#000000aa" />
                <Ionicons name="ios-arrow-back" size={35} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>{setSelected([]),setOpen(false)}} />
                
                <AntDesign name="upload" size={30} style={{position:'absolute', zIndex:2,marginLeft:'85%',margin:5,padding:10}} onPress={()=>{handlerSaveImage(selected); setOpen(false)}} color="black" />
                <View style={{backgroundColor:"#fff",flex:1, justifyContent:"center", alignItems:"center"}}>
                  <Text style={{alignSelf:"center", fontSize:20, marginTop:25}}>Mover Fotos</Text>
                  < FlatList 
                      showsVerticalScrollIndicator={false}
                      horizontal={false}
                      numColumns={3}
                      style={{marginTop:30}}
                      data={images}
                      keyExtractor={(item)=>item.id.toString()}
                      ListEmptyComponent={<Text>No se econtraron Imagenes!</Text>}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.flatListItem}
                          key={item.id}
                          onPress={() => handlerCheck(item)}>
                          <View style={{flex:1, alignItems:"center",marginTop:0}}>
                            <Image  source={{uri : item.image}}
                                    style={{width:width/3.5,height:height/6, borderRadius:5}}
                            />
                          </View>
                          {console.log(selected)}
                          {!selected.includes(item.id) ? 
                            <View style={{position:'absolute',right:'5%',top:'5%'}}>
                              <MaterialIcons name="check-box-outline-blank" size={24} color="#ff0000" />
                            </View>
                          : 
                            <View style={{position:'absolute',right:'5%',top:'5%'}}>
                              <MaterialCommunityIcons name="checkbox-marked" size={24} color="#00ff00" />
                            </View>
                          }
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item.index}
                    />
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={abrir}>
                <StatusBar backgroundColor="#000000aa" />
                <Ionicons name="ios-arrow-back" size={35} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>{setSelected([]),setAbrir(false)}} />
                <FontAwesome name="trash-o" size={30} style={{position:'absolute', zIndex:2,marginLeft:'85%',margin:5,padding:10}} onPress={()=>{handlerRemoveImage(selected); setAbrir(false)}} color="black" />
                <View style={{backgroundColor:"#fff",flex:1, justifyContent:"center", alignItems:"center"}}>
                  <Text style={{alignSelf:"center", fontSize:20, marginTop:25}}>Quitar Fotos</Text>
                  < FlatList 
                      showsVerticalScrollIndicator={false}
                      horizontal={false}
                      numColumns={3}
                      style={{marginTop:30}}
                      data={theImages}
                      keyExtractor={(item)=>item.id.toString()}
                      ListEmptyComponent={<Text>No se econtraron Imagenes!</Text>}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.flatListItem}
                          key={item.id}
                          onPress={() => handlerCheck(item)}>
                          <View style={{flex:1, alignItems:"center",marginTop:0}}>
                            <Image  source={{uri : item.image}}
                                    style={{width:width/3.5,height:height/6, borderRadius:5}}
                            />
                          </View>
                          {console.log(selected)}
                          {!selected.includes(item.id) ? 
                            <View style={{position:'absolute',right:'5%',top:'5%'}}>
                              <MaterialIcons name="check-box-outline-blank" size={24} color="#ff0000" />
                            </View>
                          : 
                            <View style={{position:'absolute',right:'5%',top:'5%'}}>
                              <MaterialCommunityIcons name="checkbox-marked" size={24} color="#00ff00" />
                            </View>
                          }
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item.index}
                    />
                </View>
            </Modal>
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
  square: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 0,
    backgroundColor: '#008577',
    borderStyle: 'solid',
    borderTopWidth: height*0.048,
    borderBottomWidth: height*0.048,
    borderTopColor: '#008577',
    borderBottomColor: '#008577',
  },
  flatListItem: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagesByAlbumScreen;