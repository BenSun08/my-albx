const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ben14Sun08',
    database: 'alibaixiu'
});
connection.connect();

module.exports={
    /**
     * @api validate the user's info inputed
     * @apiName validateUser
     * @param {String} email the email of the user
     * @param {Function} callback
     */
    validateUser(email,callback){
        let dml = `SELECT id,email,\`password\` FROM users WHERE email='${email}'`;
        connection.query(dml,(err,results)=>{
            if(err){
                callback(err);
            }else{
                callback(null,results[0]);
            }
        })
    },
}