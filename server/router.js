module.exports = (app) => {
  const { router, $controller, $middleware } = app;
  // 登录注册认证
  router.post("/h5/auth/login", $controller.auth.login);
  router.post("/h5/auth/register", $controller.auth.register);
  // 用户
  router.get(
    "/h5/user/info",
    $middleware.auth,
    $controller.user.getUserInfo
  );
  router.post(
    "/h5/user/update/name",
    $middleware.auth,
    $controller.user.updateUserName
  );
  router.post(
    "/h5/user/update/pass",
    $middleware.auth,
    $controller.user.updateUserPass
  );
  router.post(
    "/h5/user/update/avatar",
    $middleware.auth,
    $controller.user.updateUserAvatar
  );
  router.get(
    "/h5/user/getUserList",
    $middleware.auth,
    $controller.user.getUserList
  );
  // 页面
  router.get(
    "/h5/page/getMyPages",
    $middleware.auth,
    $controller.page.myPages
  );
  router.post("/h5/page/create", $middleware.auth, $controller.page.create);
  router.post(
    "/h5/page/update",
    $middleware.auth,
    $controller.page.updatePage
  );
  router.post(
    "/h5/page/delete",
    $middleware.auth,
    $controller.page.deletePage
  );
  router.post("/h5/page/copy", $middleware.auth, $controller.page.copyPage);
  router.post(
    "/h5/page/setPublish",
    $middleware.auth,
    $controller.page.publish
  );
  router.post(
    "/h5/page/setTemplate",
    $middleware.auth,
    $controller.page.setTemplate
  );
  router.get(
    "/h5/page/detail",
    $middleware.auth,
    $controller.page.pageDetail
  );
  // 页面渲染
  router.get("/h5/view/:pageId", $controller.page.view);
  // 页面渲染
  router.post("/h5/joinUs/:pageId", $controller.page.joinUs);

  // 页面协作
  router.get(
    "/h5/page/getCooperationList",
    $middleware.auth,
    $controller.cooperation.getCooperationUserListByPageId
  );
  router.post(
    "/h5/page/addCooperation",
    $middleware.auth,
    $controller.cooperation.addCooperationUser
  );
  router.post(
    "/h5/page/delCooperation",
    $middleware.auth,
    $controller.cooperation.removeCooperationUser
  );
  // 我的模板
  router.get(
    "/h5/page/getMyTemplates",
    $middleware.auth,
    $controller.page.getMyTemplates
  );
  // 模板市场
  router.get(
    "/h5/page/getPublishTemplates",
    $middleware.auth,
    $controller.page.getPublishTemplates
  );

  // html2canvas 跨域接口配置
  // router.get('/h5/html2canvas/corsproxy', $controller.htmlToCanvas.corsproxy);

  // psd上传相关
  router.post("/h5/psd/upload", $middleware.auth, $controller.psd.psdPpload);

  // 我的图片库
  router.get(
    "/h5/imageLib/myImages",
    $middleware.auth,
    $controller.image.getMyImages
  );
  router.post(
    "/h5/imageLib/upload",
    $middleware.auth,
    $controller.image.uploadImage
  );
  router.post(
    "/h5/imageLib/delete",
    $middleware.auth,
    $controller.image.deleteImage
  );
  // 我的图片库
  router.get(
    "/h5/whatsApp/myWhatsApps",
    $middleware.auth,
    $controller.whatsApp.myWhatsApps
  );
  router.post(
    "/h5/whatsApp/addWhatsApp",
    $middleware.auth,
    $controller.whatsApp.addWhatsApp
  );
  router.post(
    "/h5/whatsApp/delWhatsApp",
    $middleware.auth,
    $controller.whatsApp.delWhatsApp
  );

  // 页面渲染
  router.get(
    "/h5/dashboard/getPageData",
    $middleware.auth,
    $controller.dashboard.getPageData
  );

  return router;
};
