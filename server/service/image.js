module.exports = (app) => ({
  /**
   * 获取我的图片列表
   * @returns {Promise<*>}
   */
  async getMyImages() {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let query = { author: userData.id };
    return await $model.Image.findAll({
      where: query,
      attributes: ["id", "url"],
    });
  },
  /**
   * 添加图片
   * @param url
   * @returns {Promise<*>}
   */
  async addImage(url) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    return await $model.Image.create({
      author: userData.id,
      url: url,
    });
  },

  /**
   * 添加图片
   * @param url
   * @returns {Promise<*>}
   */
  async delImage(id) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    return await $model.Image.destroy({
      where: { author: userData.id, id: id },
    });
  },
});
