const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ben14Sun08",
  database: "alibaixiu"
});
connection.connect();

module.exports = {
  /**
   * @api get all the posts in the database
   * @apiName getAllPosts
   * @param {Function} callback
   * @param {Object} options
   */
  getAllPosts(options, callback) {
    let dml = `SELECT posts.id AS post_id,title,nickname AS author, \`name\` AS category,created,posts.\`status\` FROM posts 
                JOIN users ON posts.user_id = users.id
                JOIN categories ON posts.category_id = categories.id
                WHERE 1=1 `;
    if (options.category && options.category != "all") {
      dml += `AND category_id=${options.category} `;
    }
    if (options.status && options.status != "all") {
      dml += `AND posts.\`status\`='${options.status}' `;
    }
    dml += `ORDER BY post_id ASC `;
    let select_dml =
      dml +
      `LIMIT ${(options.pageIndex - 1) * options.pageSize},${
        options.pageSize
      };`;
    connection.query(select_dml, (err, results) => {
      if (err) {
        callback(err);
      } else {
        let count_dml = `SELECT COUNT(post_id) AS postsNum FROM (${dml}) AS listed_posts`;
        connection.query(count_dml, (count_err, count_res) => {
          if (count_err) {
            console.log(count_err);
          } else {
            let combRes = {
              results,
              count: count_res[0].postsNum
            };
            callback(null, combRes);
          }
        });
      }
    });
  },

  /**
   * @api add new post to database
   * @apiName addNewPost
   * @param {Object} newPost  the information and content of the new post
   * @param {Function} callback
   */
  addNewPost(newPost, callback) {
    let findID_dml = `SELECT auto_increment FROM information_schema.\`TABLES\` 
                    WHERE TABLE_SCHEMA='alibaixiu' AND TABLE_NAME='posts';`;
    connection.query(findID_dml, (err, id_res) => {
      if (err) {
        callback(err);
      } else {
        newPost.id = null;
        let oldPath = "." + newPost.feature;
        let newPath = `./uploads/figure_postID_${
          id_res[0]["auto_increment"]
        }.jpg`;
        fs.rename(oldPath, newPath, rn_err => {
          rn_err && callback(rn_err);
        });
        newPost.feature = newPath.substring(1);
        let dml = `INSERT INTO posts SET ?`;
        connection.query(dml, newPost, insert_err => {
          if (insert_err) {
            callback(insert_err);
          } else {
            callback(null);
          }
        });
      }
    });
  },

  /**
   * @api get one post by id
   * @apiName getPostById
   * @param {Number} id2Edit id of the post to edit
   * @param {Function} callback
   */
  getPostById(id2Edit, callback) {
    let dml = `SELECT * FROM posts WHERE id=${id2Edit}; `;
    connection.query(dml, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  },

  /**
   * @api save the edited post in database
   * @apiName editPost
   * @param {Object} editedPost
   * @param {Function} callback
   */
  editPost(editedPost, callback) {
    let dml = `UPDATE posts SET ? WHERE id=${editedPost.id}`;
    connection.query(dml, editedPost, err => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  /**
   * @api delete selected post by id
   * @apiName deletePostById
   * @param {Number} id2Del
   * @param {Function} callback
   */
  deletePostById(id2Del, callback) {
    let delFigDml = `SELECT feature FROM posts WHERE id=${id2Del};`;
    connection.query(delFigDml, (err, results) => {
      if (err) {
        callback(err);
      } else {
        fs.unlink("." + results[0].feature, delFig_err => {
          if (delFig_err) {
            callback(delFig_err);
          } else {
            let dml = `DELETE FROM posts WHERE id=${id2Del}`;
            connection.query(dml, delPost_err => {
              if (delPost_err) {
                callback(delPost_err);
              } else {
                callback(null);
              }
            });
          }
        });
      }
    });
  }
};
