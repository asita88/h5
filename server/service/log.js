const { Op } = require("sequelize");
module.exports = (app) => ({
  /**
   * 获取我的图片列表
   * @returns {Promise<*>}
   */
  async getLogs(page, pageSize) {
    const { ctx, $model } = app;
    page = page > 0 ? page : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const offset = (page - 1) * pageSize;
    const logs = await $model.Log.findAndCountAll({
      offset: offset,
      limit: pageSize,
    });
    return {
      total: logs.count,
      logs: logs.rows,
    };
  },
  /**
   * 添加图片
   * @param url
   * @returns {Promise<*>}
   */
  async addLog(pageId, ip, whatsApp) {
    const { ctx, $model } = app;
    return await $model.Log.create({
      page_id: pageId,
      ip: ip,
      whatsApp: whatsApp,
    });
  },

  async delLog(id) {
    const { ctx, $model } = app;
    return await $model.Log.destroy({ where: { id: id } });
  },

  async getVisitCount(pageId) {
    const { $model } = app;

    const visitCount = await $model.Log.count({
      where: {
        page_id: pageId,
      },
    });

    return visitCount;
  },

  async getTodayVisitCount(pageId) {
    const { $model } = app;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const visitCount = await $model.Log.count({
      where: {
        page_id: pageId,
        created: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });
    return visitCount;
  },
});
