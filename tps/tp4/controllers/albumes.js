import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
   const [rows, fields] = await conn.query('SELECT * from albumes');
   res.json(rows);
};

const getAlbum = async (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
   const id = req.params.id;
   const [rows, fields] = await conn.query('SELECT * from albumes where id = ?', [id]);
   res.json(rows);
};

const createAlbum = async (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
   const nombre = req.body.nombre;
   const artista = req.body.artista;
   const [rows, fields] = await conn.query('INSERT INTO albumes (nombre, artista) VALUES (?, ?)', [nombre, artista]);
   res.send('Se ha creado el album correctamente!');
};

const updateAlbum = async (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
   const id = req.params.id;
   const nombre = req.body.nombre;
   const artista = req.body.artista;
   const [rows, fields] = await conn.query('UPDATE albumes SET albumes.nombre = ? , albumes.artista = ? WHERE albumes.id = ?', [nombre, artista, id]);
   res.send('El album se ha actualizado correctamente!');
};

const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = req.params.id;
    const [rows, fields] = await conn.query('DELETE from albumes where albumes.id = ?', [id]);
    res.send('El album se ha eliminado correctamente');
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT canciones.nombre FROM canciones JOIN albumes ON canciones.album = albumes.id WHERE canciones.album = ?', [id]);
    res.json(rows)
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
