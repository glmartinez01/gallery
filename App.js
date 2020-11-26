import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import HomeScreen from "./src/screens/HomeScreen";
import CarreteScreen from "./src/screens/CarreteScreen";

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
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name = "tabs" component={MyTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}