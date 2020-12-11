import React from "react";
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

import useDatabase from "./src/hooks/useDatabase";
import {ImagesContextProvider} from "./src/context/ImagesContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function MyTabs(){

  return(
    <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={{

            tabBarIcon:({color,size}) =>(
              <AntDesign name="home" size={size} color={color} />
            )
            
          }} />
          <Tab.Screen name="Images" component={CarreteScreen} options={{

            tabBarIcon:({color,size}) =>(
              <Entypo name="images" size={size} color={color} />
            )
          }} />
    </Tab.Navigator>
    
  )

}


export default function App(){
  const isloadingComplete = useDatabase();
  if(!isloadingComplete){
    return(
      <Text>No se ha cargado la base de datos</Text>
    );
  }
  else{
      return (
      <ImagesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name = "tabs" component={MyTabs}/>
            <Stack.Screen name = "camera" component={CaptureCamera}/>
            <Stack.Screen name = "imageScreen" component={imageScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ImagesContextProvider>
    )
  }
}