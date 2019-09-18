const loginModel = require('../models/login-model');

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
    }
}