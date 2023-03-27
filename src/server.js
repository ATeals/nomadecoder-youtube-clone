import express from "express";

const PORT = 4000;

const app = express(); 

app.listen(PORT, ()=> console.log(`server listening on http://localhost:4000/ 👻`));