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
  async getPageData() {
    const { ctx, $service, $helper } = app;
    let { ageMode, type } = ctx.request.query;
    let newPages = []
    const pages = await $service.page.getMyPages(ageMode, type);
    for (let page of pages) {
      page = page.get({ plain: true });
      const visitCount = await $service.log.getVisitCount(page.id);
      const visitCountToday = await $service.log.getTodayVisitCount(page.id);

      const joinUsCount = await $service.joinUs.getJoinUsCount(page.id);
      const joinUsCountToday = await $service.joinUs.getTodayJoinUsCount(
        page.id
      );

      page.visitCount = visitCount || 0;
      page.visitCountToday = visitCountToday || 0;
      page.joinUsCount = joinUsCount || 0;
      page.joinUsCountToday = joinUsCountToday || 0;

      newPages.push(page)
    }
    $helper.returnBody(true, newPages);
  },
});
