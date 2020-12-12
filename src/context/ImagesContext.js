import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const ImagesContext = createContext({});

export const ImagesContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { images: initialImages, children } = props;

  // Almacenar los valores en el estado
  const [images, setImages] = useState(initialImages);

  // Cargar u obtener las notas
  useEffect(() => {
    refreshImages();
  }, []);

  const refreshImages = () => {
    return database.getImages(setImages);
  };

  const addNewImage = (image,album) => {
    return database.insertImages(image,album,refreshImages);
  };

  const deleteImage = (image) => {
    return database.deleteImages(image, refreshImages);
  };

  // Crear el objeto de contexto
  const imageContext = {
    images,
    addNewImage,
    deleteImage,
    refreshImages,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <ImagesContext.Provider value={imageContext}>
      {children}
    </ImagesContext.Provider>
  );
};
