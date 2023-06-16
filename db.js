const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Homebuildup" ,{
    useNewUrlparser:true
})

const Account=mongoose.model('Account',{
    id_no:Number,
    name:String,
    phone_No:Number,
    password:String,
    r_id:Number,
        eplan:String,
        eaddress:String,
        
    
   

})
module.exports={
    Account
}