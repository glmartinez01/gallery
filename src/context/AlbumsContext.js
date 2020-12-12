import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const AlbumsContext = createContext({});

export const AlbumsContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { albums: initialAlbums, children } = props;

  // Almacenar los valores en el estado
  const [albums, setAlbums] = useState(initialAlbums);

  // Cargar u obtener las notas
  useEffect(() => {
    refreshAlbums();
  }, []);

  const refreshAlbums = () => {
    return database.getAlbums(setAlbums);
  };

  const addNewAlbum = (album) => {
    return database.insertAlbums(album, refreshAlbums);
  };

  const deleteAlbum = (album) => {
    return database.deleteAlbums(album, refreshAlbums);
  };

  // Crear el objeto de contexto
  const albumContext = {
    albums,
    addNewAlbum,
    deleteAlbum,
    refreshAlbums,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <AlbumsContext.Provider value={albumContext}>
      {children}
    </AlbumsContext.Provider>
  );
};
