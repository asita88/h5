const { Op } = require("sequelize");
const { isNil } = require("lodash");
module.exports = (app) => ({
  /**
   * 获取我的页面列表
   * @returns {Promise<*>}
   */
  async getMyPages(pageMode, type) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let query = {
      isTemplate: { [Op.not]: true },
    };
    if (!isNil(pageMode)) {
      query["pageMode"] = pageMode;
    }

    query.author = userData.id;

    return $model.Page.findAll({
      where: query,
      attributes: ["id", "title", "coverImage", "isPublish"],
    });
  },

  /**
   * 获取我的页面数量
   * @returns {Promise<void>}
   */
  async getMyPagesCount(pageMode) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let query = {
      author: userData.id,
      pageMode: pageMode,
      is_delete: { [Op.not]: true },
      isTemplate: { [Op.not]: true },
    };
    return await $model.Page.count({ where: query });
  },

  /**
   * 获取我的协作页面数量
   * @returns {Promise<void>}
   */
  async getCooperationPagesCount(pageMode) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let query = {
      pageMode: pageMode,
      is_delete: { [Op.not]: true },
      isTemplate: { [Op.not]: true },
    };
    return await $model.Page.count({ where: query });
  },

  /**
   * 获取我的模板列表
   * @param pageMode
   */
  async getMyTemplates(pageMode) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    let query = { author: userData.id, isTemplate: true };
    if (pageMode) {
      query.pageMode = pageMode;
    }
    return await $model.Page.findAll({
      where: query,
      attributes: ["id", "title", "coverImage"],
    });
  },

  /**
   * 创建页面
   * @param pageData
   * @returns {Promise<*>}
   */
  async create(pageData) {
    const { ctx, $model } = app;
    let userData = ctx.userData;
    return await $model.Page.create({
      ...pageData,
      author: userData.id,
    });
  },

  /**
   * 更新修改页面
   * @param pageData
   * @returns {Promise<*>}
   */
  async update(pageData) {
    const { $model } = app;
    return await $model.Page.update(pageData, { where: { id: pageData.id } });
  },

  /**
   * 彻底删除文档
   * @param id
   * @returns {Promise<boolean>}
   */
  async deletePage(id) {
    const { $model } = app;
    return await $model.Page.destroy({ where: { id: id } });
  },

  /**
   * 获取页面详情
   * @param id
   * @returns {Promise<*>}
   */
  async getPageDetail(id) {
    const { $model } = app;
    return await $model.Page.findByPk(id);
  },

  /**
   * 发布页面
   * @param id
   * @returns {Promise<*>}
   */
  async setPublish(id) {
    const { $model } = app;
    return await $model.Page.update({ id: id }, { isPublish: true });
  },

  /**
   * 通过用户列表添加协作人
   * @param pageId
   * @param userIds
   * @returns {Promise<$addToSet.cooperation_user|{$each}|query.cooperation_user|{$elemMatch}>}
   */
  async addCooperationUser(pageId, userIds) {
    const { $model } = app;
    await $model.Page.update(
      { id: pageId },
      {
        members: {
          [Op.arrayUnion]: userIds,
        },
      }
    );
    let pageData = await $model.Page.findOne({
      where: { id: pageId },
      include: {
        model: $model.User,
        as: "members",
        attributes: ["name", "username", "id", "email", "avatar"],
      },
    });
    pageData = pageData.toJSON();
    return pageData.members;
  },

  /**
   * 获取协作人列表
   * @param pageId
   * @returns {Promise<RegExpExecArray>}
   */
  async getCooperationUserListByPageId(pageId) {
    const { $model } = app;
    let doc = await $model.Page.findOne({
      where: { id: pageId },
      include: {
        model: $model.User,
        as: "members",
        attributes: ["name", "username", "id", "email", "avatar"],
      },
    });
    doc = doc.toJSON();
    return doc.members;
  },

  /**
   * 移出协作人
   * @param pageId
   * @param userId
   * @returns {Promise<*>}
   */
  async removeCooperationUser(pageId, userId) {
    const { $model } = app;
    return await $model.Page.update(
      { id: pageId },
      {
        members: {
          [Op.arrayRemove]: [userId],
        },
      },
      { runValidators: true }
    );
  },

  /**
   * 获取模板市场所有模板
   * @param pageMode
   * @returns {Promise<*>}
   */
  async getPublishTemplates(pageMode) {
    const { $model } = app;
    let query = { isPublish: true, isTemplate: true };
    if (pageMode) {
      query.pageMode = pageMode;
    }
    return await $model.Page.findAll({
      where: query,
      attributes: ["id", "title", "coverImage"],
    });
  },
});
