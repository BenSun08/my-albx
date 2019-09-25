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


    /**
     * @api get all users from database
     * @apiName getAllUsers
     * @param {Function} callback
     */
    getAllUsers(callback){
        let dml = `SELECT * FROM users;`
        connection.query(dml, (err, results)=>{
            if(err){
                callback(err);
            }else{
                callback(null, results);
            }
        })
    },

    /**
     * @api add new user to database
     * @apiName addNewUser
     * @param {Object} newUser
     * @param {Function} callback
     */
    addNewUser(newUser, callback){
        let dml = `INSERT INTO users SET ?;`;
        connection.query(dml,newUser, err=>{
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        })
    },

    /**
     * @api delete the user by id
     * @apiName deleteUserById
     * @param {Number | Array} id2Del
     * @param {Function} callback
     */
    deleteUserById(id2Del, callback){
        let dml = `DELETE FROM users WHERE id IN (${id2Del});`;
        connection.query(dml, err=>{
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        })
    }
}