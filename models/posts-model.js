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
     */
    getAllPosts(callback){
        let dml=`SELECT title,nickname AS author,\`name\` AS category,created,posts.\`status\` FROM posts,users,categories WHERE posts.user_id=users.id AND posts.category_id=categories.id;`
        connection.query(dml,(err,results)=>{
            if(err){
                callback(err)
            }else{
                callback(null,results);
            }
        })
    },

    /**
     * @api get the formatted date string
     * @apiName getFormattedDate
     * @param {Date} createdDate 
     */
    getFormattedDate(createdDate){
        let year = createdDate.getFullYear();
        let month = createdDate.getMonth()+1;
        let date = createdDate.getDate();
        month = month<10 ? '0'+month : month;
        date = date<10 ? '0'+date : date;
        return year+'/'+month+'/'+date;
    }
}