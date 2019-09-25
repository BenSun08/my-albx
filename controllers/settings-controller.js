const settingsModel = require("../models/settings-model");

module.exports = {
  /**
   * @api {GET} /getNavMenus
   * @apiName getNavMenus
   */
  getNavMenus(req, rsp) {
    settingsModel.getNavMenus((err, result) => {
      if (err) {
        console.log(err);
        rsp.send({
          code: 400,
          msg: "Get nav-menus failed!",
          err: err.code
        });
      } else {
        rsp.send({
          code: 200,
          msg: "Get nav-menus successfully!",
          data: JSON.parse(result.value)
        });
      }
    });
  },

  /**
   * @api {POST} /addNewNav
   * @apiName addNewNav
   */
  addNewNav(req, rsp) {
    let newNav = req.body;
    newNav.icon = "";
    settingsModel.getNavMenus((err, result) => {
      if (err) {
        console.log(err);
        rsp.send({
          code: 400,
          msg: "Get nav-menus failed!",
          err: err.code
        });
      } else {
        let navMenus = JSON.parse(result.value);
        navMenus.push(newNav);
        settingsModel.updateNavMenus(navMenus, add_err => {
          if (add_err) {
            console.log(add_err);
            rsp.send({
              code: 400,
              msg: "Add new nav-menus failed!",
              err: add_err.code
            });
          } else {
            rsp.send({
              code: 200,
              msg: "New nav-menus added successfully!"
            });
          }
        });
      }
    });
  },

  /**
   * @api {GET} /deleteNav
   * @apiName deleteNav
   */
  deleteNav(req, rsp){
      settingsModel.getNavMenus((err, result)=>{
          if(err){
              rsp.send({
                  code: 400,
                  msg: 'Get nav-menus failed!',
                  err: err.code
              })
          }else{
              let navMenus = JSON.parse(result.value);
              let delTextArr = req.query.text.split(',');
              delTextArr.forEach(element=>{
                  let index2Del = navMenus.findIndex(e=>e.text==element);
                  navMenus.splice(index2Del, 1);
              });
              settingsModel.updateNavMenus(navMenus, del_err=>{
                  if(del_err){
                    rsp.send({
                        code: 400,
                        msg: 'Navigation deleted failed!',
                        err: del_err.code
                    })
                  }else{
                      rsp.send({
                          code: 200,
                          msg: 'Navigation deleted successfully!'
                      })
                  }
              })
          }
      })
  }
};
