const mysql=require('mysql2');

const MySQLconnect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Hrdk1264@",
    database:"JstokenAuth"
})


var Connection=MySQLconnect.connect((err)=>{
    if(err)
    {
        console.log(err.message);
    }else{
        console.log("Database Connection successfully established!");
    }
})

module.exports=MySQLconnect;