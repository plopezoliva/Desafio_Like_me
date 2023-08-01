const express= require('express');
const app= express();
const {agregarDatos, obtenerPosts, modificarLike, eliminarlike} = require('./consultas');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen (3000, console.log('servidor encendido'));

app.get('/posts', async (req,res)=>{
    const resultado= await obtenerPosts()
    res.json(resultado)
})
app.post('/posts', async (req,res)=>{
    const {titulo, url, descripcion} = req.body
    await agregarDatos(titulo, url, descripcion)
    res.json('')

})
app.put('/posts/like/:id', async (req, res) =>{
    try{
    const {id} = req.params
    await modificarLike(id)
    res.send('Like modificado con éxito')
    res.status(204);
}catch (error){
    console.error(error);
    res.status(500).json({message:'server internal error'});
}

})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    await eliminarlike(id)
    res.send("Post eliminado con éxito")
    })

