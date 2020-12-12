import { Container, View,Header,Body,Card, Input } from "native-base";
import React,{useContext,useEffect,useState} from "react";
import {StyleSheet,Text,Dimensions,StatusBar, Modal,Keyboard} from "react-native";
import { AntDesign,Ionicons } from '@expo/vector-icons';

import {AlbumsContext} from "../context/AlbumsContext";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const {width, height} = Dimensions.get("window")

const CarreteScreen = ({navigation}) => {

    const [album,setAlbum] = useState(null);
    const [open,setOpen] = useState(false);
    const [albumError,setAlbumError] = useState(false);


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
            setSearchError(false);
        }
    }
    
    useEffect(() => {
        if (album) setAlbumError(false)
    }, [album]);

    
    return(
        
        <Container>
            {/*Header */}
            <StatusBar backgroundColor="#ffdbcf" />
            <View>
                <View style={styles.triangle}/>
                <View style={styles.square}/>
            </View>
            <View>
                <View style={{position:'absolute', left:width*0.06, top:height*0.027}}>
                    <AntDesign name="addfolder" size={24} color="black" onPress={()=>{setOpen(true)}}/> 
                </View>
                <View style={{position:'absolute', left:width*0.25, top:height*0.027}}>
                    <Text style={{fontSize:20,color:'#3c1e22'}}>Albums</Text>
                </View>  
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
                                        <TouchableOpacity onPress={()=>{navigation.navigate("imagesbyAlbumScreen",{id:item.id})}} >
                                            <Card style={styles.gallery}>
                                                
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
                <Modal animationType="slide" transparent={false} visible={open}>
                    <Ionicons name="ios-arrow-back" size={35} color="black" style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>setOpen(false)} />
                    <AntDesign name="upload" size={30} style={{position:'absolute', zIndex:2,marginLeft:'85%',margin:5,padding:10}} onPress={()=>{addNewAlbum(album,refreshAlbums); refreshAlbums(); setOpen(false)}} color="black" />
                    <View style={{flex:1, justifyContent:"center",alignItems:"center", zIndex:1}}>
                        <View style={{height:50, zIndex:1}}>
                            <Input placeholder="Album Name" value={album} onChangeText={setAlbum} style={{color:'#000',backgroundColor:"#aaa"}} placeholderTextColor={albumError?'#ff0000':'#000'}/>
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
        left: width*0.715,
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopWidth: height*0.16,
        borderLeftWidth: height*0.16,
        borderRightWidth: 0,
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