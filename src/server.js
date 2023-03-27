import express from "express";

const PORT = 4000;

const app = express(); 

app.get("/", (req, res)=>{ 
    return res.send("hello sever!");
});

app.get("/login", (req, res)=>{ 
    return res.send("THis page is login page!!");
});


app.listen(PORT, ()=> console.log(`server listening on http://localhost:4000/ 👻`));



 