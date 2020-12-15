import React, { useContext, useEffect, useState,useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet,Dimensions,FlatList,StatusBar,Image,Modal,TouchableOpacity } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { Container,Content,Text,Textarea,Spinner,Button,View,Card } from "native-base";
import CheckBox from '@react-native-community/checkbox'
import Images from 'react-native-scalable-image';
import * as Font from "expo-font";

// Importar el contexto de las notas
import { ImagesContext } from "../context/ImagesContext";

const {width, height} = Dimensions.get("window");

const ImagesByAlbumScreen = ({ route, navigation }) => {
  const { id,name } = route.params;
  const [theImages, setTheImages] = useState(null);
  const [open,setOpen] = useState(false);
  const imagesContext = useContext(ImagesContext);
  const { image, getImageByAlbumId,modifyImage,refreshImages } = imagesContext;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [data, setData] = useState(null);
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

  useEffect(() => {
    onRefresh();
  }, []);


  const handlerSaveImage = (array) => {
      array.forEach(element => {
        modifyImage(id,element, refreshImages);
      });
      refreshImages();
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
        <StatusBar backgroundColor="#ffdbcf" />
        <View>
          <View style={styles.square}/>
        </View>
        <View>
          <View style={{position:'absolute', left:width*0.05, top:height*0.01}}>
            <Ionicons style={{padding:10}} name="ios-arrow-back" size={30} color="#3c1e22" onPress= {()=> navigation.goBack()} />  
          </View>
          <View style={{position:'absolute', left:width*0.25, top:height*0.027}}>
            <Text style={{fontSize:20,color:'#3c1e22'}}>{name}</Text>
          </View>
          
          {id!==1 ? <View style={{position:'absolute', right:width*0.06, top:height*0.027}}>
                  <Ionicons name="ios-add" size={35} style={{position:'absolute',right:5}} color="black" onPress={() => setOpen(true)}/>
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
            
           

            <Modal animationType="fade" transparent={true} visible={open}>
                <StatusBar backgroundColor="#000000aa" />
                <Ionicons name="ios-arrow-back" size={35} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>setOpen(false)} />
                
                <AntDesign name="upload" size={30} style={{position:'absolute', zIndex:2,marginLeft:'85%',margin:5,padding:10}} onPress={()=>{handlerSaveImage(selected); setOpen(false)}} color="black" />
                
                <View style={{backgroundColor:"#fff",flex:1, justifyContent:"center", alignItems:"center"}}>
                
                < FlatList 
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    numColumns={3}
                    style={{borderRadius:1,marginTop:67}}
                    data={images}
                    keyExtractor={(item)=>item.id.toString()}
                    ListEmptyComponent={<Text>No images found!</Text>}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.flatListItem}
                        key={item.id}
                        onPress={() => handlerCheck(item)}>
                        <View style={{flex:1, alignItems:"center",marginTop:0}}>
                          <Image  source={{uri : item.image}}
                                  style={{width:width/3,height:height/6}}
                          />
                        </View>
                        {console.log(selected)}
                        {!selected.includes(item.id) ? (
                          <Text style={{ color: 'red' }}>{'Not Selected'}</Text>
                        ) : (
                          <Text style={{ color: 'green' }}>{'Selected'}</Text>
                        )}
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
  selected:{
    color:'#fff',
    backgroundColor:'rgba(18,21,33,0.8)',
    color:'#fff',
    zIndex:-1,
    position:'absolute',
    top:'70%',
    paddingTop:5,
    paddingBottom:5,
    paddingRight:5,
    paddingLeft:5
  },
});

export default ImagesByAlbumScreen;