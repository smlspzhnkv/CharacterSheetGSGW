import express from 'express';
import cors from 'cors';
import db from './db.js';
const app=express();
app.use(cors());
app.use(express.json());

app.get('/cases',(req,res)=>{
 db.all('SELECT id,title,updated FROM cases ORDER BY updated DESC',[],(_,r)=>res.json(r));
});
app.get('/case/:id',(req,res)=>{
 db.get('SELECT * FROM cases WHERE id=?',[req.params.id],(_,r)=>res.json(r||null));
});
app.post('/case',(req,res)=>{
 const {id,title,data}=req.body;
 const u=Date.now();
 db.run('INSERT INTO cases(id,title,updated,data) VALUES(?,?,?,?)',[id,title,u,JSON.stringify(data)],()=>res.json({ok:true}));
});
app.put('/case/:id',(req,res)=>{
 const {title,data}=req.body;
 const u=Date.now();
 db.run('UPDATE cases SET title=?,updated=?,data=? WHERE id=?',[title,u,JSON.stringify(data),req.params.id],()=>res.json({ok:true}));
});
app.delete('/case/:id',(req,res)=>{
 db.run('DELETE FROM cases WHERE id=?',[req.params.id],()=>res.json({ok:true}));
});
app.listen(3000,()=>console.log('Server on 3000'));
