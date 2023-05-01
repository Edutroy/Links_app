const express =require('express');
const router= express.Router();
const pool = require ('../database');

router.get ('/add' , (req,res)=>{
res.render('links/add');
});

router.post('/add', async (req, res)=>{
    const { title,url,description }= req.body;//obtiene las propiedades del body
    const newLink ={//guarda los datos en un nuevo objeto 'newLink'
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?',[newLink]);
    console.log(newLink);
    res.send('received');
});

module.exports =router; 