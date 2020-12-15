import { Container, View,Header,Body,Card, Input, Item } from "native-base";
import React,{useContext,useEffect,useState,useCallback} from "react";
import {StyleSheet,Text,Dimensions,StatusBar, Modal,Keyboard,TouchableOpacity} from "react-native";
import { AntDesign,Ionicons,FontAwesome,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';

import {AlbumsContext} from "../context/AlbumsContext";
import { FlatList } from "react-native-gesture-handler";

const {width, height} = Dimensions.get("window")

const CarreteScreen = ({navigation}) => {

    const [album,setAlbum] = useState(null);
    const [open,setOpen] = useState(false);
    const [abri,setAbrir] = useState(false);
    const [albumError,setAlbumError] = useState(false);
    const [selected,setSelected] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => {
        setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(5).then(() => setRefreshing(false));
    }, []);
    
    //context
    const { albums } = useContext(AlbumsContext);

    const albumsContext = useContext(AlbumsContext);
    const {addNewAlbum, refreshAlbums} = albumsContext;

    const handlerInput = () => {
        if(!album)  {
            setAlbumError(true);
            Keyboard.dismiss(); 
        }
        else
        {
            Keyboard.dismiss(); 
            addNewAlbum(album,refreshAlbums);
            refreshAlbums();
            setAlbum("");
            setAlbumError(false);
            setOpen(false);
        }
    }
    
    useEffect(() => {
        if (album) setAlbumError(false)
        onRefresh();
    }, [album]);

    useEffect(() => {
        onRefresh();
      }, []);

    

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


    return(
        
        <Container>
            {/*Header */}
            <StatusBar backgroundColor="#008577" />
            <View>
                <View style={styles.triangle}/>
                <View style={styles.square}/>
            </View>
            <View>
                <View style={{position:'absolute', left:width*0.06, top:height*0.027}}>
                    <AntDesign name="addfolder" size={24} color="black" onPress={()=>{setOpen(true)}}/> 
                </View>
                <View style={{position:'absolute', left:width*0.25, top:height*0.027}}>
                    <Text style={{fontSize:20,color:'black'}}>Albums</Text>
                </View>
                {/* {<View style={{position:'absolute', right:width*0.06, top:height*0.027}}>
                    <FontAwesome name="trash-o" size={28} color="black" onPress={()=>{setAbrir(true)}}/> 
                </View>} */}
            </View>
            <View style={{marginTop:100}}>
            <FlatList
                        numColumns={2}
                        style={{borderRadius:1}}
                        showsVerticalScrollIndicator={false}
                        data={albums}
                        keyExtractor={(item)=>item.id.toString()}
                        ListEmptyComponent={
                            <View style={{justifyContent: "center", alignItems: "center", height: height}}>
                                <Text style={{justifyContent: "center", alignItems: "center", fontSize: 20,}}>
                                No albums found!
                                </Text>
                            </View>
                        }

                        renderItem={({item}) => {
                                return(
                                    <View style={{flex:1, alignItems:"center"}}>
                                        <TouchableOpacity onPress={()=>{navigation.navigate("imagesbyAlbumScreen",{id:item.id,name:item.album})}} >
                                            <Card style={styles.gallery}>
                                                <AntDesign style={{marginTop:30}} name="folder1" size={100} color="black" />
                                                <Text style={styles.texto}>
                                                    {item.album}
                                                </Text>
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }
                    />
                </View>
                <Modal animationType="fade" transparent={true} visible={open}>
                    <StatusBar backgroundColor="#000000aa" />
                    <View style={{backgroundColor:"#000000aa", flex:1, justifyContent:"center", alignItems:"center"}}>
                        <View style={{backgroundColor:"#fff", height:180, width:'90%', borderRadius:10}}>
                            <Ionicons name="ios-arrow-back" size={35} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>setOpen(false)} />
                            <Ionicons name="ios-add" size={35} style={{position:'absolute', zIndex:2,marginLeft:'84%', margin:5,padding:15}} onPress={handlerInput} color="black" />
                            <Text style={{alignSelf:"center", fontSize:20, marginTop:20}}>Add Album</Text>
                            <Item style={{backgroundColor:'#fff',marginLeft:10,marginRight:10,flex:1,justifyContent:"center",alignItems:"center"}}>
                                <Input placeholder="Name" value={album} onChangeText={setAlbum} placeholderTextColor={'rgba(0,0,0,0.5)'} style={{color:'#000', borderBottomWidth:3}}/>
                            </Item>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="fade" transparent={true} visible={abri}>
                    <StatusBar backgroundColor="#000000aa" />
                    <View style={{backgroundColor:"#000000aa", flex:1, justifyContent:"center", alignItems:"center"}}>
                        <View style={{backgroundColor:"#fff", width:'90%', borderRadius:10}}>
                            <Ionicons name="ios-arrow-back" size={35} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>{setSelected([]),setAbrir(false)}} />
                            <FontAwesome name="trash-o" size={35}  style={{position:'absolute', zIndex:2,right:'5%',top:'5%'}} color="black" /> 
                            <Text style={{alignSelf:"center", fontSize:20, marginTop:20}}>Eliminar Album</Text>
                            <FlatList
                                style={{margin:40}}
                                showsVerticalScrollIndicator={false}
                                data={albums}
                                keyExtractor={(item)=>item.id.toString()}
                                ListEmptyComponent={
                                    <View style={{justifyContent: "center", alignItems: "center", height: height}}>
                                        <Text style={{justifyContent: "center", alignItems: "center", fontSize: 20,}}>
                                        No tienes albumnes
                                        </Text>
                                    </View>
                                }

                                renderItem={({item}) => {
                                        return(
                                            <View style={{flex:1,alignItems:'flex-start'}}>
                                                {!(item.id===1 || item.id===2) ?
                                                    <TouchableOpacity onPress={() => handlerCheck(item)} >
                                                        <View style={{position:'absolute',marginTop:10}}>
                                                            {!selected.includes(item.id) ?
                                                                <MaterialIcons name="check-box-outline-blank" size={24} color="#ff0000" />
                                                            :   <MaterialCommunityIcons name="checkbox-marked" size={24} color="#00ff00" />
                                                            }
                                                        </View>
                                                            <Text style={{color:'#000',fontSize:20, marginLeft:30,marginTop:10}}>{item.album}</Text>
                                                        
                                                    </TouchableOpacity>
                                                :   null
                                                }
                                            </View>
                                        )
                                    }
                                }
                            />
                        </View>
                    </View>
                </Modal>
        </Container>

    )

}

const styles = StyleSheet.create({
    gallery:{
        
        backgroundColor:'#fff',
        borderWidth:3, 
        borderRadius:10, 
        height:height*0.27, 
        width:width*0.45,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:10,
        alignItems:'center',
    },
    texto:{
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
    triangle:{
        position: 'absolute',
        right: 0,
        left: width*0.718,
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopWidth: height*0.16,
        borderLeftWidth: height*0.16,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopColor: '#008577',
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
        backgroundColor: '#008577',
        borderStyle: 'solid',
        borderTopWidth: height*0.048,
        borderBottomWidth: height*0.048,
        borderTopColor: '#008577',
        borderBottomColor: '#008577',
    },
});


export default CarreteScreen;