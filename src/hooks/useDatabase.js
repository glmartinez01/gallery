import { Form } from "native-base";
import React, { useEffect, useState } from "react";
import { database } from "../components/db";
import {AsyncStorage} from "react-native";

const useDatabase = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadDatabase = async () => {
    try {

      const setup = await AsyncStorage.getItem("setup");

      if(!setup){
        await database.setupDatabaseAlbumsTableAsync();
        await database.setupAlbumsAsync();
        await database.setupAlbumsAsync2();
        await database.setupDatabaseTableAsync();
      } 
      
      // Finaliza la carga de la DB
      setIsLoadingComplete(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  return isLoadingComplete;
};

export default useDatabase;
