import React, { useEffect, useState } from "react";
import { database } from "../components/db";

const useDatabase = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadDatabase = async () => {
    try {
      //await database.dropDatabaseAlbumsTableAsync();
      await database.setupDatabaseAlbumsTableAsync();
      //await database.setupAlbumsAsync();
      //await database.setupAlbumsAsync2();
      //await database.dropDatabaseTableAsync();
      await database.setupDatabaseTableAsync();
      //await database.setupImagesAsync();
      //await database.setupExtra();

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
