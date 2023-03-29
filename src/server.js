import express from "express";

const PORT = 4000;

const app = express(); 

const logger = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();
};

const privateMiddleware = (req, res, next)=>{
    const url = req.url;
    if(url ==="/protected"){
        return res.send("<h1> Not Allowd</h1>");
    }
    next();
}

app.use(logger);
app.use(privateMiddleware);


app.get("/protected", (req, res)=>{
    return res.send("Welcome to private room!");
});

app.get("/", (req, res)=>{ 
    return res.send("hello sever!");
});


app.listen(PORT, ()=> console.log(`server listening on http://localhost:4000/ 👻`));



 