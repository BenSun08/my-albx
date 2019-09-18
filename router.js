const express = require('express');
const pagesController = require('./controllers/pages-controller');
const router = express.Router();

router.get('/', pagesController.getIndexPage)
      .get('/list',pagesController.getListPage)
      .get('/detail',pagesController.getDetailPage)
      .get('/admin/categories.html',pagesController.getAdminCategoriesPage)
      .get('/admin/index.html', pagesController.getAdminIndexPage)
      .get('/admin/posts.html', pagesController.getAdminPostsPage)
      .get('/admin/post-add.html', pagesController.getAdminPostAddPage)
      .get('/admin/comments.html', pagesController.getAdminCommentsPage)
      .get('/admin/users.html', pagesController.getAdminUsersPage)
      .get('/admin/nav-menus.html', pagesController.getAdminNavMenusPage)
      .get('/admin/slides.html', pagesController.getAdminSlidesPage)
      .get('/admin/settings.html', pagesController.getAdminSettingsPage)
      .get('/admin/profile.html', pagesController.getAdminProfilePage)
      .get('/admin/login.html', pagesController.getAdminLoginPage)
      .get('/admin/password-reset.html', pagesController.getAdminPwdResetPage)

module.exports = router;