const postsModel = require('../models/posts-model');

module.exports={
    /**
     * @api in this controller, all the pages will be rendered
     * @param {Object} req the get views request
     * @param {Object} rsp the reponse with corresponding 
     */

     getIndexPage(req,rsp){
        rsp.render('index');
     },

     getListPage(req,rsp){
         rsp.render('list');
     },

     getDetailPage(req,rsp){
         rsp.render('detail');
     },

     getAdminCategoriesPage(req,rsp){
         rsp.render('admin/categories');
     },

     getAdminIndexPage(req,rsp){
        rsp.render('admin/index');
     },

     getAdminPostsPage(req,rsp){
        postsModel.getAllPosts((err,results)=>{
            if(err){
                console.log(err);
            }else{
                results.forEach(element=>{
                    if(element.status == 'published'){
                        element.status='已发布';
                    }else if(element.status == 'drafted'){
                        element.status='未发布';
                    };
                    element.created = postsModel.getFormattedDate(element.created);
                })
                console.log(results);
                rsp.render('admin/posts',{postsInfo: results});
            }
        })
     },

     getAdminPostAddPage(req,rsp){
         rsp.render('admin/post-add');
     },

     getAdminCommentsPage(req,rsp){
         rsp.render('admin/comments');
     },

     getAdminUsersPage(req,rsp){
         rsp.render('admin/users');
     },

     getAdminNavMenusPage(req,rsp){
         rsp.render('admin/nav-menus');
     },
     
     getAdminSlidesPage(req,rsp){
         rsp.render('admin/slides');
     },

     getAdminSettingsPage(req,rsp){
         rsp.render('admin/settings');
     },

     getAdminProfilePage(req,rsp){
         rsp.render('admin/profile');
     },

     getAdminLoginPage(req,rsp){
         rsp.render('admin/login');
     },

     getAdminPwdResetPage(req,rsp){
         rsp.render('admin/password-reset');
     }
}