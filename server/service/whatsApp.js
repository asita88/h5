const { Sequelize, DataTypes, Op } = require("sequelize");
module.exports = (app) => ({
  /**
   * 获取我的图片列表
   * @returns {Promise<*>}
   */
  async getMyWhatsApps(page, pageSize) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let query = { author: userData.id };
    page = page > 0 ? page : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const offset = (page - 1) * pageSize;
    const datas = await $model.WhatsApp.findAndCountAll({
      offset: offset,
      limit: pageSize,
    });
    return {
      total: datas.count,
      datas: datas.rows,
    };
  },
  /**
   * 添加图片
   * @param url
   * @returns {Promise<*>}
   */
  async addWhatsApp(
    id,
    username,
    status,
    show_num,
    max_show,
    join_num,
    max_join
  ) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let whatsAppData = {
      author: userData.id,
      username: username,
      status: status,
      show_num: show_num,
      max_show: max_show,
      join_num: join_num,
      max_join: max_join,
    };
    const [whatsApp, created] = await $model.WhatsApp.findOrCreate({
      where: { id: id },
      defaults: whatsAppData,
    });
    if (!created) {
      await whatsApp.update(whatsAppData);
    }
    return whatsApp;
  },

  async delWhatsApp(id) {
    const { ctx, $model } = app;
    // let userData = ctx.userData;
    return await $model.WhatsApp.destroy({ where: { id: id } });
  },

  async getRandomWhatsApp() {
    const { ctx, $model } = app;
    let allWhatsApp = await $model.WhatsApp.findAll({
      where: {
        show_num: {
          [Op.lt]: Sequelize.literal("max_show"),
        },
      },
      attributes: ["id", "username"],
    });
    // 随便获取
    if (allWhatsApp.length === 0) {
      allWhatsApp = await $model.WhatsApp.findAll();
    }
    if (allWhatsApp.length === 0) {
      return;
    }
    let randomIndex = Math.floor(Math.random() * allWhatsApp.length);
    await allWhatsApp[randomIndex].increment("show_num", { by: 1 });
    return allWhatsApp[randomIndex];
  },
});
