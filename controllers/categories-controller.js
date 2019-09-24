const categoriesModel =require('../models/categories-model');

module.exports = {
  /**
   * @api {GET} /getAllCategories
   * @apiName getAllCategories
   */
  getAllCategories(req,rsp){
      categoriesModel.getAllCategories((err,results)=>{
          if(err){
              rsp.send({
                  code: 400,
                  msg: 'Categories loaded failed!'
              })
          }else{
              rsp.send({
                  code: 200,
                  msg: 'Categories loaded successfully!',
                  data: results
              })
          }
      })
  },

  /**
   * @api {POST} /addNewCategory
   * @apiName addNewCategpry
   */
  addNewCategory(req, rsp){
      let newCateg =req.body;
      categoriesModel.addNewCategory(newCateg, err=>{
          if(err){
              rsp.send({
                  code:400,
                  msg: 'Category added failed!',
                  err: err.code
              })
          }else{
              rsp.send({
                  code: 200,
                  msg: 'Category added successfully!'
              })
          }
      })
  },

  /**
   * @api {POST} /editCategory
   * @apiName editCategory
   */
  editCategory(req, rsp){
      let editedCateg = req.body;
      categoriesModel.editCategById(editedCateg, err=>{
          if(err){
              rsp.send({
                  code: 400,
                  msg: 'Category modified failed!',
                  err: err.code
              })
          }else{
              rsp.send({
                  code: 200,
                  msg: 'Category modified successfully!'
              })
          }
      })
  },

  /**
   * @api {GET} /deleteCategory
   * @apiName deleteCategory
   */
  deleteCategory(req, rsp){
      let id2Del = req.query.id;
      categoriesModel.deleteCategById(id2Del, err=>{
          if(err){
              rsp.send({
                  code: 400,
                  msg: 'Category deleted failed!',
                  err: err.code
              })
          }else{
              rsp.send({
                  code: 200,
                  msg: 'Category deleted successfully!'
              })
          }
      })
  }
}