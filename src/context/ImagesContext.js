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
  const [image, setImage] = useState("");

  // Cargar u obtener las notas
  useEffect(() => {
    refreshImages();
  }, []);

  const getImageByAlbumId = (id) => {
    return database.getImageByAlbum(id, setImage);

    console.log(response);

    // Obtener el valor de la primera posición del arreglo
    // const value = note[0];
    // setNote(value);

    // console.log(value);
    // console.log(note);
  };

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
    image,
    getImageByAlbumId,
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
