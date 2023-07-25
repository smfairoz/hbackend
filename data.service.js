
const jwt = require("jsonwebtoken");

const db=require("./db")

const register=(idno,uname,phone,pswd)=>{
    return db.Account.findOne({
        id_no:idno
    
    }).then(idd=>{
        console.log(idd)
      
        if(idd){
            return{
                status:false,
                message:"This email-id is already exist ! ",
                statusCode:404
            }
        }
        else{
            
            let accnt=new db.Account({
                id_no:idno,
                name:uname,
                phone_No:phone,
                password:pswd,
                enquire: [],
             
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

const login = (idno,pswd) =>{
    return db.Account.findOne({
        id_no:idno,
        password:pswd,
    }).then(res=>{
        if(res){
            currentUser=res.name
            currentidno=idno
            token=jwt.sign(
                {currentidno: idno},"secretsuperkey1234"
            )
            return {
                status:true,
                message:"Login successfull",
                statusCode:200,
                currentUser,
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

const enquirenow=(phone, plan, address,id_no)=>{
 console.log(id_no)
//  console.log(req.)
return db.Account.findOne({
    id_no:id_no,
    
  
   
    }).then(res=>{
        // console.log(res)
        // if(res){
        //    if (res.id_no !=req.id_no){
        //     return{
        //         status:false,
        //         message:"cannot be added",
        //         statusCode:404
        //     };
        // }
            if(res){  
                console.log(res)
                let enquireobject={
                   
                    phone,
                    plan,
                    address,
                    id_no,

                };
                res.enquire.push(enquireobject);
             res.save();
            
             return{
                status:true,
                message:"added successfully",
                statusCode:200,
             
             
            };
        }


    
    else{
        return{
            status:false,
            message:"please enter valid data",
            statusCode:401,
        };
    }

    
    }).catch((err)=>console.log(err));
};
   
const getenquire=(id_no)=>{
    return db.Account.findOne({
        id_no:id_no
    }).then((res)=>{
        if(res){
            return{
                status:true,
                message:"success",
                data:res.enquire,
                statusCode:200,
            }
        }
        else{
            return{
                status:false,
                message:"failed",
                statusCode:400,
            }
        }
    })
}
      
           
        
     
    



       


module.exports ={
    register,
    login,
    enquirenow,
    getenquire,
};