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
        let  dml = `SELECT title,nickname AS author, \`name\` AS category,created,posts.\`status\` FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN categories ON posts.category_id = categories.id
                LIMIT ${options.pageIndex-1},${options.pageSize};`
        connection.query(dml,(err,results)=>{
            if(err){
                callback(err)
            }else{
                let count_dml = `SELECT COUNT(id) AS postsNum FROM posts;`;
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
}