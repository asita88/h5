const { Op } = require("sequelize");
module.exports = (app) => ({
  /**
   * 获取我的图片列表
   * @returns {Promise<*>}
   */
  async getJoinUs(page, pageSize) {
    const { ctx, $model } = app;
    page = page > 0 ? page : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const offset = (page - 1) * pageSize;
    const logs = await $model.JoinUs.findAndCountAll({
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
  async addJoinUs(pageId, ip, whatsApp) {
    const { ctx, $model } = app;

    const whatsAppRecord = await $model.WhatsApp.findOne({
      where: { username: whatsApp },
    });
    if (whatsAppRecord) {
      await whatsAppRecord.increment("join_num", { by: 1 });
    }

    return await $model.JoinUs.create({
      pageId: pageId,
      ip: ip,
      whatsApp: whatsApp,
    });
  },

  async delJoinUs(id) {
    const { ctx, $model } = app;
    return await $model.JoinUs.destroy({ where: { id: id } });
  },

  async getJoinUsCount(pageId) {
    const { $model } = app;

    const JoinUsCount = await $model.JoinUs.count({
      where: {
        page_id: pageId,
      },
    });

    return JoinUsCount;
  },

  async getTodayJoinUsCount(pageId) {
    const { $model } = app;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const JoinUsCount = await $model.JoinUs.count({
      where: {
        page_id: pageId,
        created: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });
    return JoinUsCount;
  },
});
