const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Homebuildup" ,{
    useNewUrlparser:true
})

const Account=mongoose.model('Account',{
    // id_no:Number,
    id_no:String,
    name:String,
    phone_No:Number,
    password:String,
    enquire:[]

 



    
   

})
module.exports={
    Account,
    // Enquire
    
}