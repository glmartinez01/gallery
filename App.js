import React from "react";
import { Image } from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, View} from "native-base";


import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import HomeScreen from "./src/screens/HomeScreen";
import CarreteScreen from "./src/screens/CarreteScreen";
import CaptureCamera from "./src/screens/CameraScreen";
import imageScreen from "./src/screens/imageScreen";
import ImagesByAlbumScreen from "./src/screens/imagesbyAlbumScreen";

import useDatabase from "./src/hooks/useDatabase";
import {ImagesContextProvider} from "./src/context/ImagesContext";
import {AlbumsContextProvider} from "./src/context/AlbumsContext";

import TabBar from './src/obj/TabBar.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function TabNavigator (){
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen} initialParams={{ icon: 'home' }}
      />
      <Tab.Screen name='Albums' component={CarreteScreen} initialParams={{ icon2: 'images' }}
      />
    </Tab.Navigator>
  );
};



export default function App(){
  const isloadingComplete = useDatabase();
  if(!isloadingComplete){
    return(
      <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
        <Image source = {require('./assets/loader.gif')}/>
      </View>
    );
  }
  else{
      return (
      <AlbumsContextProvider>
        <ImagesContextProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
              <Stack.Screen name = "tabs" component={TabNavigator}/>
              <Stack.Screen name = "camera" component={CaptureCamera}/>
              <Stack.Screen name = "imageScreen" component={imageScreen}/>
              <Stack.Screen name = "imagesbyAlbumScreen" component={ImagesByAlbumScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ImagesContextProvider>
      </AlbumsContextProvider>
    )
  }
}