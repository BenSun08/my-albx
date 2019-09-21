const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ben14Sun08',
    database:'alibaixiu'
});
connection.connect();

module.exports={
    /**
     * @api get all the posts in the database
     * @apiName getAllPosts
     * @param {Function} callback
     * @param {Object} options
     */
    getAllPosts(options, callback){
        let  dml = `SELECT posts.id AS post_id,title,nickname AS author, \`name\` AS category,created,posts.\`status\` FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN categories ON posts.category_id = categories.id
                WHERE 1=1 `
        if(options.category && options.category != 'all'){
            dml += `AND category_id=${options.category} `;
        };
        if(options.status && options.status != 'all'){
            dml += `AND posts.\`status\`='${options.status}' `;
        };
        dml += `ORDER BY post_id ASC `;
        let select_dml = dml + `LIMIT ${options.pageIndex-1},${options.pageSize};`
        connection.query(select_dml,(err,results)=>{
            if(err){
                callback(err)
            }else{
                let count_dml = `SELECT COUNT(post_id) AS postsNum FROM (${dml}) AS listed_posts`;
                connection.query(count_dml,(count_err, count_res)=>{
                    if(count_err){
                        console.log(count_err);
                    }else{
                        let combRes = {
                            results,
                            count:count_res[0].postsNum
                        }
                        callback(null,combRes);
                    }
                })
            }
        })
    },

    /**
     * @api get all the categories from database
     * @apiName getAllCategories
     * @param {Function} callback
     */
    getAllCategories(callback){
        let dml = `SELECT id,\`name\` FROM categories
                ORDER BY id ASC;`
        connection.query(dml, (err,results)=>{
            if(err){
                callback(err);
            }else{
                callback(null,results);
            }
        })
    }
}