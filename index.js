
const express = require("express");
const jwt=require("jsonwebtoken")

const cors=require("cors");
const dataservice = require("./data.service")

const app = express()

app.use(cors({
    origin:"http://localhost:4200"
}))

app.use(express.json())

// const appMiddleware=(req, res, next)=>{
//     try{
//         console.log("middle")
//         token=req.headers["x-access-token"];
// console.log(token)
//         result=jwt.verify(token,"secretsuperkey1234");
//         req.idno=result.currentidno
//         console.log(result);
//         next();
//     }
//     catch{
//         console.log("catch")
//         res.status(400).json({
//             status:false,
//             message:"invalid user...please login",
//             statusCode:400
//         });
//     }
// };



app.post('/register',(req,res)=>{
    const result = dataservice.register(req.body.idno,req.body.uname,req.body.phone,req.body.pswd)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.post('/login',(req,res)=>{
    const result = dataservice.login(req.body.idno,req.body.pswd)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.post('/enquirenow', (req,res)=>{
    console.log(req.body.id_no)
    const result =dataservice.enquirenow(
        req.body.phone,
        req.body.plan,
        req.body.address,
        req.body.id_no);
        console.log("req.body")
    result.then((resobj)=>{
        res.status(resobj.statusCode).send(resobj);
        // console.log(result)
    });
});

app.post('/getenquire',(req,res)=>{
    const result=dataservice.getenquire(req.body.id_no)
    result.then(resobj =>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})