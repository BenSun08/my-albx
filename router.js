const express = require('express');
const pagesController = require('./controllers/pages-controller');
const userController = require('./controllers/user-controller');
const postsController = require('./controllers/posts-controller');
const categoriesController =require('./controllers/categories-controller');
const router = express.Router();

router.get('/', pagesController.getIndexPage)
      .get('/list',pagesController.getListPage)
      .get('/detail',pagesController.getDetailPage)
      .get('/admin/categories',pagesController.getAdminCategoriesPage)
      .get('/admin/index', pagesController.getAdminIndexPage)
      .get('/admin/posts', pagesController.getAdminPostsPage)
      .get('/admin/post-add', pagesController.getAdminPostAddPage)
      .get('/admin/comments', pagesController.getAdminCommentsPage)
      .get('/admin/users', pagesController.getAdminUsersPage)
      .get('/admin/nav-menus', pagesController.getAdminNavMenusPage)
      .get('/admin/slides', pagesController.getAdminSlidesPage)
      .get('/admin/settings', pagesController.getAdminSettingsPage)
      .get('/admin/profile', pagesController.getAdminProfilePage)
      .get('/admin/login', pagesController.getAdminLoginPage)
      .get('/admin/password-reset', pagesController.getAdminPwdResetPage)

      //deal with the login and lgout process
      .post('/userLogin', userController.userLogin)
      .get('/userLogout', userController.userLogout)

      //deal with posts
      .get('/getAllPosts', postsController.getAllPosts)
      .post('/uploadFigure', postsController.uploadFigure)
      .post('/addNewPost', postsController.addNewPost)
      .get('/getPostById', postsController.getPostById)
      .post('/editPost', postsController.editPost)
      .get('/deletePost', postsController.deletePost)

      // deal with categories mangagement
      .get('/getAllCategories', categoriesController.getAllCategories)
      .post('/addNewCategory', categoriesController.addNewCategory)
      .post('/editCategory', categoriesController.editCategory)
      .get('/deleteCategory', categoriesController.deleteCategory)
module.exports = router;