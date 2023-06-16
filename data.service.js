const { text } = require("express");
const jwt = require("jsonwebtoken");

const db=require("./db")

const register=(id_no,name,phone_No,password)=>{
    return db.Account.findOne({
        id_no
    
    }).then(id=>{
        console.log(id)

        if(id){
            return{
                status:false,
                message:"This id is already exist ! ..please login!!",
                statusCode:404
            }
        }
        else{
            let accnt=new db.Account({
                id_no,
                name,
                phone_No,
                password,
               
              
            })
            accnt.save()
            return{
                status:true,
                message:"Registration completed",
                statusCode:201
            }
        }
    })
}

const login = (id_no,password) =>{
    return db.Account.findOne({
        id_no:id_no,
        password:password,
    }).then(res=>{
        if(res){
            currentuser=res.name
            currentidno=id_no
            token=jwt.sign(
                {currentidno:id_no},"secretsuperkey1234"
            )
            return {
                status:true,
                message:"Login successfull",
                statusCode:200,
                currentuser,
                currentidno,
                token,
            }
        }
        else{
            return{
                status:false,
                message:"invalid password or idno",
                statusCode:400
            }
        }
    })
}

const enquirenow=(r_id,eplan,eaddress)=>{
 
    return db.Account.findOne({
        r_id,
    eplan,
    eaddress
   
    }).then(res=>{
        console.log(res)
        if(res){
           
                return{
                 status:false,
                 message:"already exist",
                 statusCode:404
                }

            }
            else{
                let enqury=new db.Account({
                    r_id,
               eplan,
               eaddress
                  
                })
              
                enqury.save()
                return{
                    status:true,
                    message:"addedd successfull",
                    statusCode:201
                }
            }
})
}
module.exports ={
    register,
    login,
    enquirenow,
};