// Definir el nombre de la base de datos y la colección
const database = 'test';
const collection = 'users';

// Usar la base de datos especificada
use(database);

// Crear un array de objetos con los atributos de usuarios
const users = [
  { name: 'yonatan', password: '@w8L98a9y3SB1Ar1zi6KhL27h' },
  { name: 'david', password: '883ey$3*TldX33AKsQGksa4v%' },
];

db.getCollection('users').insertOne({
  { name: 'david', password: '883ey$3*TldX33AKsQGksa4v%' },
 
});