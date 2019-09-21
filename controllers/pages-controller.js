module.exports = {
  /**
   * @api in this controller, all the pages will be rendered
   * @param {Object} req the get views request
   * @param {Object} rsp the reponse with corresponding
   */

  getIndexPage(req, rsp) {
    rsp.render("index");
  },

  getListPage(req, rsp) {
    rsp.render("list");
  },

  getDetailPage(req, rsp) {
    rsp.render("detail");
  },

  getAdminCategoriesPage(req, rsp) {
    rsp.render("admin/categories");
  },

  getAdminIndexPage(req, rsp) {
    rsp.render("admin/index");
  },

  getAdminPostsPage(req, rsp) {
    rsp.render("admin/posts");
  },

  getAdminPostAddPage(req, rsp) {
    rsp.render("admin/post-add");
  },

  getAdminCommentsPage(req, rsp) {
    rsp.render("admin/comments");
  },

  getAdminUsersPage(req, rsp) {
    rsp.render("admin/users");
  },

  getAdminNavMenusPage(req, rsp) {
    rsp.render("admin/nav-menus");
  },

  getAdminSlidesPage(req, rsp) {
    rsp.render("admin/slides");
  },

  getAdminSettingsPage(req, rsp) {
    rsp.render("admin/settings");
  },

  getAdminProfilePage(req, rsp) {
    rsp.render("admin/profile");
  },

  getAdminLoginPage(req, rsp) {
    rsp.render("admin/login");
  },

  getAdminPwdResetPage(req, rsp) {
    rsp.render("admin/password-reset");
  }
};
