const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ben14Sun08',
    database: 'alibaixiu'
});
connection.connect();

module.exports = {
    /**
     * @api get the navigation menus from database
     * @apiName getNavMenus
     * @param {Function} callback
     */
    getNavMenus(callback){
        let dml = `SELECT * FROM \`options\` WHERE id=9;`;
        connection.query(dml, (err,results)=>{
            if(err){
                callback(err);
            }else{
                callback(null, results[0]);
            }
        })
    },

    /**
     * @api add new navigation to the database
     * @apiName updateNavMenus
     * @param {Array} menusArr
     * @param {Funtion} callback
     */
    updateNavMenus(menusArr, callback){
        let dml = `UPDATE options SET value='${JSON.stringify(menusArr)}' WHERE id=9;`;
        connection.query(dml, err=>{
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        })
    },
}
