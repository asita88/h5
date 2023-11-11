const { Op } = require("sequelize");
module.exports = (app) => ({
  /**
   * 新增用户
   * @param username
   * @param password
   * @param email
   * @param name
   * @returns {Promise<void>}
   */
  async createUser(username, password, email, name) {
    const { $model } = app;
    await $model.User.create({
      username: username,
      password: password,
      email: email,
      name: name || username,
    });
    return await $model.User.findOne({
      where: { username: username },
      attributes: { exclude: ["password"] },
    });
  },

  /**
   * 根据用户名查找用户
   * @param username
   * @returns {Promise<void>}
   */
  async getUsersByUsername(username) {
    const { ctx, $model } = app;
    if (username.length === 0) {
      return null;
    }
    return await $model.User.findOne({
      where: { username: username },
      attributes: { exclude: ["password"] },
    });
  },

  /**
   * 根据用户名查找用户
   * @param username
   * @returns {Promise<void>}
   */
  async getUsersPasswordByUsername(username) {
    const { $model } = app;
    if (username.length === 0) {
      return null;
    }
    return await $model.User.findOne({
      where: { username: username }
    });
  },

  /**
   * 根据关键字，获取一组用户
   * @param query
   * @returns {Promise[users]}
   */
  async getUsersByQuery(query) {
    const { ctx, $model } = app;
    return await $model.User.findAll({
      where: query,
      attributes: { exclude: ["password"] },
    });
  },

  /**
   * 更新个人头像
   * @param url
   * @returns {Promise<void>}
   */
  async updateUserAvatar(url) {
    const { ctx, $model } = app;
    const userData = await ctx.userData;
    await $model.User.update({ avatar: url }, { where: { id: userData.id } });
    return await $model.User.findOne({
      where: { id: userData.id },
      attributes: { exclude: ["password"] },
    });
  },

  /**
   * 更新用户昵称
   * @param name
   * @returns {Promise<void>}
   */
  async updateUserName(name) {
    const { ctx, $model } = app;
    const userData = await ctx.userData;
    await $model.User.update({ name: name }, { where: { id: userData.id } });
    return await $model.User.findOne({
      where: { id: userData.id },
      attributes: { exclude: ["password"] },
    });
  },

  /**
   * 更新个人密码
   * @param newPass
   * @returns {Promise<void>}
   */
  async updateUserPass(newPass) {
    const { ctx, $model } = app;
    const userData = await ctx.userData;
    await $model.User.update(
      { password: newPass },
      { where: { id: userData.id } }
    );
    return await $model.User.findOne({
      where: { id: userData.id },
      attributes: { exclude: ["password"] },
    });
  },

  /**
   * 关键字模糊查询
   * @param keywords
   * @returns {Promise<void>}
   */
  async getUserByKeyWords(keywords) {
    const { $model } = app;
    return await $model.User.findAll({
      where: {
        [Op.or]: [
          {
            name: { [Op.iLike]: `%${keywords}%` },
            username: { [Op.iLike]: `%${keywords}%` },
            email: { [Op.iLike]: `%${keywords}%` },
          },
        ],
      },
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
      limit: 20,
    });
  },
});
