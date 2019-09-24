const moment = require('moment');
const commentsModel = require('../models/comments-model');

module.exports = {
    /**
     * @api {GET} /getAllComments
     * @apiName getAllComments
     */
    getAllComments(req, rsp){
       commentsModel.getAllComments(req.query, (err,results)=>{
           if(err){
               rsp.send({
                   code: 400,
                   msg: 'Comments loaded failed!'
               })
           }else{
               results.data.forEach(element=>{
                   element.created = moment(element.created).format("YYYY-MM-DD HH:mm");
                   switch (element.status) {
                       case 'approved':
                           element.status = '已批准';
                           break;
                       case 'rejected':
                           element.status = '已驳回';
                           break;
                       case 'held':
                           element.status = '未处理';
                           break;
                       default:
                           break;
                   }
               })
               rsp.send({
                   code: 200,
                   msg: 'Comments loaded successfully!',
                   result: results
               })
           }
       }) 
    },

    /**
     * @api {GET} /deleteComment
     * @apiName deleteComment
     */
    deleteComment(req, rsp){
        commentsModel.deleteCommentById(req.query.id, err=>{
            if(err){
                rsp.send({
                    code: 400,
                    msg: 'Comment deleted failed!',
                    err: err.code
                })
            }else{
                rsp.send({
                    code: 200,
                    msg: 'Comment deleted successfully!'
                })
            }
        })
    },

    /**
     * @api {POST} /changeStatus
     * @apiName changeStatus
     */
    changeStatus(req, rsp){
        commentsModel.changeStatusById(req.body, err=>{
            if(err){
                rsp.send({
                    code: 400,
                    msg: 'Status changed failed!',
                    err: err.code
                })
            }else{
                rsp.send({
                    code: 200,
                    msg: 'Status changed successfully!'
                })
            }
        })
    }
}