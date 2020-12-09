import React from "react";
import * as SQLite from "expo-sqlite";

// https://docs.expo.io/versions/latest/sdk/sqlite/
// Crea y abre la base de datos
const db = SQLite.openDatabase("gallery.db");

// Funcionalidades de la base de datos

// Obtener las imagenes del usuario
const getImages = (setImagesFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from images",
      [],
      (_, { rows: { _array } }) => {
        setImagesFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las imagenes");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Imagenes obtenidas");
      }
    );
  });
};

// Insertar notas
const insertImages = (note, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into images (image, status) values (?,?)", [
        note,
        "NUEVA",
      ]);
    },
    (_t, error) => {
      console.log("Error al insertar la imagen");
      console.log(error);
    },
    (_t, _success) => {
      successFunc;
    }
  );
};

// Borrar la base de datos
const dropDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table images");
      },
      (_t, error) => {
        console.log("Error al eliminar la tabla de imagenes");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
      }
    );
  });
};

// Creación de la tabla de imagenes
const setupDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists images (id integer primary key autoincrement, image text not null, status text not null);"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla creada!");
        resolve(success);
      }
    );
  });
};

// Agrega una "imagen" por defecto
const setupImagesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into images (image, status) values (?,?)", [
          "Bienvenido a Fastnotes",
          "NUEVA",
        ]);
      },
      (_t, error) => {
        console.log("Error al momento de insertar los valores por defecto");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        resolve(success);
      }
    );
  });
};

export const database = {
  getImages,
  insertImages,
  dropDatabaseTableAsync,
  setupDatabaseTableAsync,
  setupImagesAsync,
};
