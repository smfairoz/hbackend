
const express = require("express");
const jwt=require("jsonwebtoken")

const cors=require("cors");
const dataservice = require("./data.service")

const app = express()

app.use(cors({
    origin:"http://localhost:4200"
}))

app.use(express.json())

// const appMidleware=(req,res,next)=>{
//     try{
//         token=req.headers["x-access-token"]
//         result=jwt.verify(token,"secretsuperkey1234")
//         req.currentidno=result.currentidno
//         console.log(result +"from middleware");
//         next()
//     }
//     catch{
//         res.status(400).json({
//             status:false,
//             message:"invalid user...please login",
//             statusCode:400
//         })
//     }
// }

app.post('/register',(req,res)=>{
    const result = dataservice.register(req.body.id_no,req.body.name,req.body.phone_No,req.body.password)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.post('/login',(req,res)=>{
    const result = dataservice.login(req.body.id_no,req.body.password)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.post('/enquirenow',(req,res)=>{
    const result =dataservice.enquirenow(req.body.r_id,req.body.eplan,req.body.eaddress)
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    })
})

app.listen(3000,()=>{
    console.log("server running on port 3000");
})