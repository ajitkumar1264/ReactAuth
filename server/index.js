const express=require('express');
const auth=require("./Routes/Auth");
const bodyParser=require('body-parser');
const CookieParser=require('cookie-parser');
const cors=require('cors');
require("./DB/connect");
const app=express();

app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(express.json());
app.use(CookieParser());


app.use("/auth/",auth);
app.use("/",(req,res)=>{
    res.json({success:"message is true"})
});




app.listen(4000,(req,res)=>{
    console.log("your server is running on the port 3000");
})