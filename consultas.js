//Importar la clase Pool del paquete pg
const { Pool } = require("pg");

//Crear una instancia de la clase Pool usando un objeto de configuración con las credenciales.
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin2020",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarDatos = async (titulo, img, descripcion, likes = 0) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  return result;
  console.log("Posts agregado");
};
const obtenerPosts = async () => {
  const consulta = "SELECT * FROM posts";
  const { rows } = await pool.query(consulta);
  return rows;
};

const modificarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result;
};

const eliminarlike = async (id) => {
        const consulta = "DELETE FROM posts WHERE id = $1";
        const values = [id]
        const result = await pool.query(consulta, values)
        return result;
}
module.exports = { agregarDatos, obtenerPosts, modificarLike,eliminarlike };
