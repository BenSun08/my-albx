const moment = require('moment');
const postsModel = require("../models/posts-model");

module.exports = {
  /**
   * @api {GET} /getAllPosts
   * @apiName getAllPosts
   */
  getAllPosts(req, rsp) {
    postsModel.getAllPosts(req.query,(err, combRes) => {
      if (err) {
          rsp.send({
              code:400,
              msg: 'Something went wrong when loading posts!'
          })
      } else {
        combRes.results.forEach(element => {
          if (element.status == "published") {
            element.status = "已发布";
          } else if (element.status == "drafted") {
            element.status = "草稿";
          }
          element.created = moment(element.created).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        rsp.send({
            code: 200,
            msg: "Posts loaded successfully!",
            data: combRes
        });
      }
    });
  },

  /**
   * @api {GET} /getAllCategories
   * @apiName getAllCategories
   */
  getAllCategories(req,rsp){
      postsModel.getAllCategories((err,results)=>{
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
  }
};
