/**
 * images lib 相关
 * @param app
 * @returns {{corsproxy(): Promise<void>}}
 */
module.exports = (app) => ({
  /**
   * 获取我的图片列表
   * @returns {Promise<void>}
   */
  async myWhatsApps() {
    const { ctx, $service, $helper } = app;
    let page = ctx.query.page;
    let pageSize = ctx.query.pageSize;
    const imageList = await $service.whatsApp.getMyWhatsApps(page, pageSize);
    $helper.returnBody(true, imageList);
  },
  /**
   * 上传我的图片
   * @returns {Promise<void>}
   */
  async addWhatsApp() {
    const { ctx, $service, $helper } = app;
    const { id, username, status, show_num, max_show, join_num, max_join } =
      ctx.request.body;
    const imageData = await $service.whatsApp.addWhatsApp(
      id,
      username,
      status,
      show_num,
      max_show,
      join_num,
      max_join
    );
    $helper.returnBody(true, imageData);
  },

  /**
   * 上传我的图片
   * @returns {Promise<void>}
   */
  async delWhatsApp() {
    const { ctx, $service, $helper } = app;
    const { id } = ctx.request.body;
    const imageData = await $service.whatsApp.delWhatsApp(id);
    $helper.returnBody(true, imageData);
  },
});
