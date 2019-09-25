const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ben14Sun08',
    database: 'alibaixiu'
})
connection.connect();

module.exports = {
    /**
     * @api get all comments from database
     * @apiName getAllComments
     * @param {Object} pagination
     * @param {Function} callback
     */
    getAllComments(pagination, callback){
        let dml = `SELECT comments.id,author,comments.content, posts.title,
                comments.created, comments.\`status\`
                FROM comments JOIN posts ON comments.post_id=posts.id
                ORDER BY comments.id ASC
                LIMIT ${(pagination.pageIndex-1)*pagination.pageSize},${pagination.pageSize}`;
        connection.query(dml, (err,results)=>{
            if(err){
                callback(err);
            }else{
                let count_dml = `SELECT COUNT(id) AS commentsNum FROM comments;`
                connection.query(count_dml, (count_err, count_res)=>{
                    if(count_err){
                        callback(count_err);
                    }else{
                        callback(null, {data: results, count: count_res[0].commentsNum});
                    }
                })
            }
        })
    },

    /**
     * @api delete the comment by id
     * @apiName deleteCommentById
     * @param {Number | Array} comment2Del
     * @param {Function} callback
     */
    deleteCommentById(comment2Del, callback){
        let dml =`DELETE FROM comments WHERE id IN (${comment2Del})`;
        connection.query(dml, err=>{
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        })
    },

    /**
     * @api change the status of comment by id
     * @apiName changeStatusById
     * @param {Object} newStatus
     * @param {Function} callback
     */
    changeStatusById(newStatus, callback){
        let dml =`UPDATE comments SET \`status\`='${newStatus.status}' WHERE id IN (${newStatus.id});`;
        connection.query(dml, err=>{
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        })
    },

    /**
     * @api get statistic of comments in database
     * @apiName getCommentsStatistic
     */
    getCommentsStatistic(callback){
        let dml = `SELECT COUNT(id) AS comments_num,\`status\`  FROM comments
                    GROUP BY \`status\`;`;
        connection.query(dml, (err, results)=>{
            if(err){
                callback(err);
            }else{
                let commentsNum = 0;
                let heldNum = 0;
                results.forEach(element=>{
                    commentsNum += element.comments_num;
                    if(element.status == 'held'){
                        heldNum = element.comments_num;
                    }
                });
                callback(null, {commentsNum,heldNum});
            }
        });
    }
}