const  mysql = require('mysql');

const connection = mysql.createConnection({
    password:"",
    user:"root",
    database:'malik',
     host:'localhost'
});

if(connection.connect((err)=>{
    if (err) {
        console.log('error in  connection ');
    }
    console.log('connected to database ');
}));

module.exports = connection;