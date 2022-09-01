const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const cors = require('cors');
const usermodel = require('./usermodel')

const itemmodel = require('./itemmodel')
const stockmodel = require('./stockmodel')
const moment = require('moment')



const dotenv = require('dotenv');

const sendEmail = require('./sendmail')
const crypto = require('crypto')

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL).then(
    ()=> console.log('Db connected..')
) 

app.use(express.json());
app.use(cors({origin:"*"}));



app.get('/',(req,res)=>{
    res.send('Hello to stocks API 29 08 2022 14:13');
})


app.post('/register',async (req,res) =>{
    try{
        const { fullname,email,mobile,password,confirmpassword } = req.body;
        const exist = await usermodel.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new usermodel({
            fullname,email,mobile,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})




app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await usermodel.findOne({email})
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})




app.post('/additem',middleware,async(req,res)=>{
    try{
        const {itemname} = req.body;

        const exist = await itemmodel.findOne({itemname})
        if(exist){
            return res.status(200).send('Item already exist')
        }
        const newItem = new itemmodel({
            itemname,
            available : "0"
        })
        newItem.save();

        return res.status(200).send('new item added successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('add new item Server Error ')
    }
})


// app.post('/addstock/:id',middleware,async(req,res)=>{
//     try{
//         const {quantity,incharge} = req.body;

//         let exist = await itemmodel.findById(req.params.id);
        
//         let updatedavailable = parseInt(exist.available) + parseInt(quantity);
        
        
//         const newAddedstock = new stockmodel({
//             stockname : exist.itemname,
//             quantity : quantity,
//             incharge : incharge,
//             status : "added",
//             available : updatedavailable
//         })
//         newAddedstock.save();

//         await itemmodel.findByIdAndUpdate(req.params.id,{
            
//             available : updatedavailable 
            
//         })

//         return res.status(200).send('stock added successfully')
//     }
//     catch(err){ 
//         console.log(err);
//         return res.status(500).send('add new stock Server Error ')
//     }
// })


app.post('/addstock/:id',middleware,async(req,res)=>{
    try{
        const {quantity,incharge,invoice,supplier} = req.body;

        let exist = await itemmodel.findById(req.params.id);
        
        let updatedavailable = parseInt(exist.available) + parseInt(quantity);
        
        
        const newAddedstock = new stockmodel({
            stockname : exist.itemname,
            quantity : quantity,
            invoice : invoice,
            supplier : supplier,
            incharge : incharge,
            status : "added",
            available : updatedavailable
        })
        newAddedstock.save();

        await itemmodel.findByIdAndUpdate(req.params.id,{
            
            available : updatedavailable 
            
        })

        return res.status(200).send('stock added successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('add new stock Server Error ')
    }
})


app.post('/dispatchstock/:id',middleware,async(req,res)=>{
    try{
        const {quantity,incharge,dept} = req.body;

        let exist = await itemmodel.findById(req.params.id);

        let updatedavailable = parseInt(exist.available) - parseInt(quantity);
        
        const newDispatchstock = new stockmodel({
            stockname : exist.itemname,
            quantity,
            incharge,
            dept,
            status : "dispatch",
            available : updatedavailable
        })
        newDispatchstock.save();

        await itemmodel.findByIdAndUpdate(req.params.id,{
            
            available : updatedavailable 
            
        })

        return res.status(200).send('stock dispatched successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('dispatch new item Server Error ')
    }
})



// app.post('/addstock/:id',middleware,async(req,res)=>{

    
//     const currentTime = new Date();
    
//     const istDate = currentTime.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
//     console.log(istDate)
    

//     try{
//         const {quantity,incharge,invoice,supplier} = req.body;

//         let exist = await itemmodel.findById(req.params.id);
        
//         let updatedavailable = parseInt(exist.available) + parseInt(quantity);
        
        
//         const newAddedstock = new stockmodel({
//             stockname : exist.itemname,
//             quantity : quantity,
//             invoice : invoice,
//             supplier : supplier,
//             incharge : incharge,
//             status : "added",
//             available : updatedavailable,
//             date:istDate
//         })
//         newAddedstock.save();

//         await itemmodel.findByIdAndUpdate(req.params.id,{
            
//             available : updatedavailable 
            
//         })

//         return res.status(200).send('stock added successfully')
//     }
//     catch(err){ 
//         console.log(err);
//         return res.status(500).send('add new stock Server Error ')
//     }
// })





app.post('/returnstock/:id',async(req,res)=>{

    
    // const currentTime = new Date();
    
    // const istDate = currentTime.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    // console.log(istDate)
    

    try{
        const {quantity,incharge,dept,supplier} = req.body;

        let exist = await itemmodel.findById(req.params.id);
        
        let updatedavailable = parseInt(exist.available) + parseInt(quantity);
        
        
        const newAddedstock = new stockmodel({
            stockname : exist.itemname,
            quantity : quantity,
            supplier : supplier,
            incharge : incharge,
            dept : dept,
            status : "returned",
            available : updatedavailable
        })
        newAddedstock.save();

        await itemmodel.findByIdAndUpdate(req.params.id,{
            
            available : updatedavailable 
            
        })

        return res.status(200).send('stock returned successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('returned stock Server Error ')
    }
})


// app.post('/dispatchstock/:id',middleware,async(req,res)=>{

        
//     const currentTime = new Date();
    
//     const istDate = currentTime.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

    

//     try{
//         const {quantity,incharge,dept} = req.body;

//         let exist = await itemmodel.findById(req.params.id);

//         let updatedavailable = parseInt(exist.available) - parseInt(quantity);
        
//         const newDispatchstock = new stockmodel({
//             stockname : exist.itemname,
//             quantity,
//             incharge,
//             dept,
//             status : "dispatch",
//             available : updatedavailable,
//             date:istDate
//         })
//         newDispatchstock.save();

//         await itemmodel.findByIdAndUpdate(req.params.id,{
            
//             available : updatedavailable 
            
//         })

//         return res.status(200).send('stock dispatched successfully')
//     }
//     catch(err){ 
//         console.log(err);
//         return res.status(500).send('dispatch new item Server Error ')
//     }
// })





app.get('/allitemstocks/:id',middleware,async(req,res)=>{
    try{
        let exist = await itemmodel.findById(req.params.id);
        const all = await stockmodel.find().sort({$natural:-1});
        const wanted = all.filter(singleitem => singleitem.stockname === exist.itemname)
        return res.status(200).json(wanted);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('allstocks Server Error')
    }
})

app.get('/item/:id',middleware,async (req,res)=>{
    try{
        let exist = await itemmodel.findById(req.params.id);
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('allstocks Server Error')
    }
})

app.get('/allitems',async(req,res)=>{
    try{
        const exist = await itemmodel.find()
        return res.status(200).json(exist);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('allitems Server Error')
    }
})



app.get('/allstocks',async(req,res)=>{
    try{
        const exist = await stockmodel.find().sort({$natural:-1});
        return res.status(200).json(exist);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('allstocks Server Error')
    }
})


app.post('/allstocksfilter',async(req,res)=>{
            

    try{
        const {from,to} = req.body;

        const currentTime = new Date(from);
        const currentTime2 = new Date(to);
        currentTime2.setDate(currentTime2.getDate() + 1);
    
        const istDate = currentTime.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
        const istDate2 = currentTime2.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    
        console.log(istDate);
        console.log(istDate2);
        const exist = await stockmodel.find({
    date: {
        $gte: istDate,
        $lte: istDate2
    }
})
        return res.status(200).json(exist);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('allstocks Server Error')
    }
})
















app.post('/forgetpassword',async(req,res,next)=>{
    
    let tuser= await usermodel.findOne({email:req.body.email});
    if(!tuser){
        tuser = await adminmodel.findOne({email:req.body.email});
    }

    if(!tuser){
        return res.status(200).send('user not found')
    }

    // get resetpassword token
    const resetToken= tuser.getResetPassword();
    // console.log(resetToken);
    await tuser.save({validateBeforeSave: false});

    //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
    //can change we use req._
    const resetpasswordURL=`${resetToken}`;
    const resetpasswordMessage = `your's Stocks Management reset password verification code is \n\n ${resetpasswordURL} \n\n if u have not
    requested this email, please ignore`;

    try{
        await sendEmail({
            //we will send a object with 3 key value pairs here
            email:tuser.email,
            subject:"Stocks management password Recovery",
            resetpasswordMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${tuser.email} successfully`,
        })
    }
    catch(err){
        tuser.resetPasswordToken= undefined;
        tuser.resetPasswordExpire= undefined;
        await tuser.save({validateBeforeSave: false});

        return  res.status(200).send(err);
    }
}
)








//reset password using forgot password
app.post('/resetpassword/:token',async(req,res,next)=>{
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

    let tuser = await usermodel.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now()},
    })
    if(!tuser){
        tuser = await adminmodel.findOne({
            resetPasswordToken,
            resetPasswordExpire:{ $gt:Date.now()}
        })
    }

    if(!tuser){
        return res.status(200).send('password reset token is invalid or expired')
       
    }

    if(req.body.password !== req.body.confirmpassword){
        return res.status(200).send('password did not match')
    }

    tuser.password = req.body.password;
    tuser.confirmpassword = req.body.password; 
    tuser.resetPasswordToken= undefined;
    tuser.resetPasswordExpire= undefined;

    await tuser.save();

    return  res.status(200).send("password changed successfully");

})


   


app.listen(PORT,()=> console.log('Server is Running..')) 