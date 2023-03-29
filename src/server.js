import express from "express";

const PORT = 4000;
const app = express(); 


app.use();

app.get("/", (req, res)=>{ 
    return res.send("hello sever!");
});


app.listen(PORT, ()=> console.log(`server listening on http://localhost:4000/ 👻`));

