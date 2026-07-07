import sqlite3 from 'sqlite3';
const db=new sqlite3.Database('./database.db');
db.serialize(()=>{
db.run(`CREATE TABLE IF NOT EXISTS cases(
id TEXT PRIMARY KEY,
title TEXT,
updated INTEGER,
data TEXT
)`);
});
export default db;
