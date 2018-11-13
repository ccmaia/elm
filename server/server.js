const mysql = require('mysql');
const express = require('express');
// 解析数据
const bodyParser = require('body-parser');
let server = express();

server.listen(8090);
let db = mysql.createPool({
  host:'localhost',
  port:3306,
  user:'root',
  password:'',
  database:'elm'
})
// 让数据格式正常使用
server.use(bodyParser.urlencoded(
    {
        extended:false
    }
));
server.use( '/login/elm/jiekou',(req,res) => {
    // console.log(req.body);
    let {type,user,pass} = req.body;
    console.log(user,pass);
    switch(type){
        case 'login':
            // `INSERT INTO user_table (id,user,pass) VALUES(0,'${user}','${pass}')`
            db.query(`SELECT user,pass FROM user_table WHERE user='${user}' AND pass = '${pass}';`,
            (err,data) => {
                if(err){
                    res.send('{"err":0,"msg":"select database error"}')
                }else{
                    res.send('{"err":1,"msg":"login sussecc"}')
                }
            })
            break;
        case 'reset':
            let {newPass} = req.body;
            // `UPDATA user_table SET pass = '${newPass}' WHERE user = '${user}`  
            console.log(typeof newPass,typeof user)
            db.query(`UPDATE user_table SET pass = '${newPass}' WHERE user = '${user}'`,
            (err,data) => {
                if(err){
                    res.send('{"err":0,"msg":"reset error"}')
                }else{
                    res.send('{"err":1,"msg":"reset sussecc"}')
                }
            })
            break;
        default:
            db.query(`SELECT user,pass FROM user_table WHERE user='${user}' AND pass = '${pass}';`,
            (err,data) => {
                if(err){
                    res.send('{"err":0,"msg":"user is not exit"}')
                }else{
                    res.send('{"err":1,"msg":"reset sussecc"}')
                }
            })
            break
            
    }
    
})

