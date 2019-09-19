const loginModel = require('../models/user-model');

module.exports={
    /**
     * @api {POST} validate the info of the user
     * @apiName userLogin
     */
    userLogin(req,rsp){
        let {email,password} = req.body;
        loginModel.validateUser(email,(err,result)=>{
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
    }
}