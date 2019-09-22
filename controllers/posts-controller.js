const moment = require('moment');
const formidable = require('formidable');
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
  },

  /**
   * @api {POST} /uploadFigure
   * @apiName uploadFigure
   */
  uploadFigure(req,rsp){
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './uploads/temp';
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            rsp.send({
                code: 400,
                msg: 'Figure uploaded failed!'
            })
        }else{
            let tempPath = '/'+files.figure.path.replace(/\\/g,'/');
            rsp.send({
                code: 200,
                msg: 'Figure uploaded successfull!',
                src: tempPath
            })
        }
    })
  },

  /**
   * @api {POST} /addNewPost
   * @apiName addNewPost
   */
  addNewPost(req,rsp){
    let newPost = req.body;
    newPost.user_id = req.session.currentUser.id;
    newPost.views = 0;
    newPost.likes = 0;
    postsModel.addNewPost(newPost, err=>{
      if(err){
        console.log(err);
        rsp.send({
          code: 400,
          msg: 'New Post added failed!',
          err: err.code
        })
      }else{
        rsp.send({
          code: 200,
          msg: 'New post added successfully!'
        })
      }
    })
  },

  /**
   * @api {GET} /getPostById
   * @apiName getPostById
   */
  getPostById(req, rsp){
    let id2Edit = req.query.id;
    postsModel.getPostById(id2Edit, (err,post2Edit)=>{
      if(err){
        rsp({
          code: 400,
          msg: "Post loaded failed!",
          err: err.code
        })
      }else{
        post2Edit.created = moment(post2Edit.created).format('YYYY-MM-DDTHH:mm');
        rsp.send({
          code: 200,
          msg: "Post loaded successfully!",
          data: post2Edit
        })
      }
    })
  },

  /**
   * @api {POST} /editPost
   * @apiName editPost
   */
  editPost(req, rsp){
    let editedPost = req.body;
    postsModel.editPost(editedPost, err=>{
      if(err){
        rsp.send({
          code: 400,
          msg: "Post edited failed!",
          err: err.code
        })
      }else{
        rsp.send({
          code: 200,
          msg: "Post edited successfully!"
        })
      }
    })
  },

  /**
   * @api {GET} /deletePost
   * @apiName deletePost
   */
  deletePost(req, rsp){
    let id2Del = req.query.id;
    postsModel.deletePostById(id2Del, err=>{
      if(err){
        rsp.send({
          code: 400,
          msg: 'Post deleted failed!',
          err: err.code
        })
      }else{
        rsp.send({
          code: 200,
          msg: 'Post deleted successfully!'
        })
      }
    })
  }
};
