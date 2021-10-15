const express = require('express');
const router = express.Router();
var path = require('path');
const { patch } = require('./routBlog');
const app = express();


app.use(express.static("../front"));
router.get('/home',(req,res)=>{

res.sendFile(path.join(__dirname,'../front/index.html'))
// res.send("this is home page")

})




router.get('/home/blog',(req,res)=>{

    res.sendFile('bloge.html',{ root: path.join(__dirname, '../front/blog') })
    // res.send("this is home page")
    
    })




    router.get('/home/login',(req,res)=>{

        res.sendFile('logIn.html',{ root: path.join(__dirname, '../front/regesteration/') })
        // res.send("this is home page")
        
        })
    
    


        router.get('/admin',(req,res)=>{

            res.sendFile('admin.html',{ root: path.join(__dirname, '../front/admin/') })
            // res.send("this is home page")
            
            })



module.exports=router


