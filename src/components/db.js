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

// Insertar imagen
const insertImages = (image,album, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into images (image, status,album) values (?,?,?)", [
        image,
        "NUEVA",
        album,
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

const deleteImages = (idimage, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("delete from images where id = ?", [
        idimage,
      ]);
    },
    (_t, error) => {
      console.log("Error al eliminar la imagen");
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
          "create table if not exists images (id integer primary key autoincrement, image text not null, status text not null, album integer,FOREIGN KEY(album) REFERENCES albums(id));"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla de imagenes");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla de imagenes creada!");
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


//Albums

const getAlbums = (setAlbumsFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from albums",
      [],
      (_, { rows: { _array } }) => {
        setAlbumsFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener los albumes");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Albumes Obtenidos");
      }
    );
  });
};

// Insertar imagen
const insertAlbums = (album, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into albums (album, status) values (?,?)", [
        album,
        "NUEVA",
      ]);
    },
    (_t, error) => {
      console.log("Error al insertar el album");
      console.log(error);
    },
    (_t, _success) => {
      successFunc;
    }
  );
};

const deleteAlbums = (idalbum, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("delete from albums where id = ?", [
        idalbum,
      ]);
    },
    (_t, error) => {
      console.log("Error al eliminar el album");
      console.log(error);
    },
    (_t, _success) => {
      successFunc;
    }
  );
};


// Borrar la base de datos
const dropDatabaseAlbumsTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table albums");
      },
      (_t, error) => {
        console.log("Error al eliminar la tabla de albumes");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
      }
    );
  });
};

// Creación de la tabla de imagenes
const setupDatabaseAlbumsTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists albums (id integer primary key autoincrement, album text not null, status text not null);"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla de albumes");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla de albumes creada!");
        resolve(success);
      }
    );
  });
};

// Agrega un album por defecto
const setupAlbumsAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into albums (album, status) values (?,?)", [
          "Todas las Fotos",
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
  getAlbums,
  insertImages,
  insertAlbums,
  deleteImages,
  deleteAlbums,
  dropDatabaseTableAsync,
  dropDatabaseAlbumsTableAsync,
  setupDatabaseTableAsync,
  setupDatabaseAlbumsTableAsync,
  setupImagesAsync,
  setupAlbumsAsync,
};
