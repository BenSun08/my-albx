const userModel = require('../models/user-model');
const postsModel = require('../models/posts-model');
const categoriesModel = require('../models/categories-model');
const commentsModel = require('../models/comments-model');

module.exports={
    /**
     * @api {POST} validate the info of the user
     * @apiName userLogin
     */
    userLogin(req,rsp){
        let {email,password} = req.body;
        userModel.validateUser(email,(err,result)=>{
            if(err){
                rsp.send({
                    code:400,
                    msg:'Sth went wrong, please try again'
                })
            }else{
                if(!result){
                    rsp.send({
                        code:400,
                        msg:'Your account doesn\'t exist, please register an account'
                    })
                }else{
                    if(password == result.password){
                        req.session.isLogin = 'yes';
                        req.session.currentUser = result;
                        rsp.send({
                            code:200,
                            msg:'You login successfully!'
                        })
                    }else{
                        rsp.send({
                            code:400,
                            msg:'The password you entered was wrong'
                        })
                    }
                }
            }
        })
    },

    /**
     * @api {GET} log out the user
     * @apiName userLogout
     */
    userLogout(req,rsp){
        req.session.isLogin='no';
        rsp.send({
            code:200,
            msg:'Logout successfully!'
        })
    },

    /**
     * @api collect all the statistis of the user
     * @apiName collectStatistic
     */
    collectStatistic(req,rsp){
        let resObj = {};
        postsModel.getPostsStatistic((post_err, post_res)=>{
            if(post_err){
                rsp.send({
                    code: 400,
                    msg: 'Get posts statistic failed!',
                    err: post_err.code
                })
            }else{
                resObj.postsNum = post_res.postsNum;
                resObj.draftedNum = post_res.draftedNum;
                categoriesModel.getCategoriesCount((cate_err, cate_res)=>{
                    if(cate_err){
                        rsp.send({
                            code: 400,
                            msg: 'Get categories statistic failed!',
                            err: cate_err.code
                        })
                    }else{
                        resObj.categsNum = cate_res.categsNum;
                        commentsModel.getCommentsStatistic((com_err, com_res)=>{
                            if(com_err){
                                rsp.send({
                                    code: 400,
                                    msg: 'Get comments statistc failed!',
                                    err: com_err.code
                                })
                            }else{
                                resObj.commentsNum = com_res.commentsNum;
                                resObj.heldNum = com_res.heldNum;
                                rsp.send({
                                    code: 200,
                                    msg: "Get all statistics successfully!",
                                    data: resObj
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    /**
     * @api {GET} /getAllUsers
     * @apiName getAllUsers
     */
    getAllUsers(req, rsp){
        userModel.getAllUsers((err, results)=>{
            if(err){
                rsp.send({
                    code: 400,
                    msg: 'Users loaded failed!',
                    err: err.code
                })
            }else{
                results.forEach(element=>{
                    if(element.status == 'activated'){
                        element.status = '已激活';
                    }else{
                        element.status = '未激活';
                    }
                })
                rsp.send({
                    code: 200,
                    msg: 'Users loaded successfully!',
                    data: results
                })
            }
        })
    },

    /**
     * @api {POST} /addNewUser
     * @apiName addNweUser
     */
    addNewUser(req, rsp){
        let newUser = req.body;
        newUser.id = null;
        newUser.status = 'held';
        userModel.addNewUser(newUser, err=>{
            if(err){
                rsp.send({
                    code: 400,
                    msg: 'New user added failed!',
                    err: err.code
                })
            }else{
                rsp.send({
                    code: 200,
                    msg: 'New user added successfully!'
                })
            }
        })
    },

    /**
     * @api {GET} /deleteUser
     * @apiName deleteUser
     */
    deleteUser(req, rsp){
        userModel.deleteUserById(req.query.id, err=>{
            if(err){
                console.log(err);
                rsp.send({
                    code: 400,
                    msg: 'User deleted failed!',
                    err: err.code
                })
            }else{
                rsp.send({
                    code: 200,
                    msg: 'User deleted successfully!'
                })
            }
        })
    }
}