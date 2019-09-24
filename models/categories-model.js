const mysql =require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ben14Sun08',
    database: 'alibaixiu'
});
connection.connect();

module.exports = {
  /**
   * @api get all the categories from database
   * @apiName getAllCategories
   * @param {Function} callback
   */
  getAllCategories(callback) {
    let dml = `SELECT * FROM categories
                ORDER BY id ASC;`;
    connection.query(dml, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  /**
   * @api add the new category to database
   * @apiName addNewCategory
   * @param {Object} newCategory
   * @param {Function} callback
   */
  addNewCategory(newCategory, callback){
    newCategory.id = null;
    let dml=`INSERT INTO categories SET ?`;
    connection.query(dml, newCategory,err=>{
      if(err){
        callback(err);
      }else{
        callback(null);
      }
    })
  },

  /**
   * @api edit the category by id
   * @apiName editCategById
   * @param {Object} editedCateg
   * @param {Function} callback
   */
  editCategById(editedCateg, callback){
    let dml = `UPDATE categories SET ? WHERE id=${editedCateg.id}`;
    connection.query(dml, editedCateg, err=>{
      if(err){
        callback(err);
      }else{
        callback(null);
      }
    })
  },

  /**
   * @api delete the category by id
   * @apiName deleteCategById
   * @param {Number} id2Del
   * @param {Function} callback
   */
  deleteCategById(id2Del, callback){
    let dml = `DELETE FROM categories WHERE id=${id2Del}`;
    connection.query(dml, err=>{
      if(err){
        callback(err);
      }else{
        callback(null);
      }
    })
  }
}