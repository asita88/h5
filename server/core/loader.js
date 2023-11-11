const path = require("path");
const fs = require("fs");
const Router = require("koa-router");
const schedule = require("node-schedule");
const { Sequelize, DataTypes } = require("sequelize");

//自动扫指定目录下面的文件并且加载
function scanFilesByFolder(dir, cb) {
  let _folder = path.resolve(__dirname, dir);
  if (!getFileStat(_folder)) {
    return;
  }
  try {
    const files = fs.readdirSync(_folder);
    files.forEach((file) => {
      let filename = file.replace(".js", "");
      let oFileCnt = require(_folder + "/" + filename);
      cb && cb(filename, oFileCnt);
    });
  } catch (error) {
    console.log("文件自动加载失败...", error);
  }
}

// 检测文件夹是否存在
/**
 * @param {string} path 路径
 */
function getFileStat(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

// 配置信息
const initConfig = function () {
  let config = {};
  scanFilesByFolder("../config", (filename, content) => {
    config = { ...config, ...content };
  });
  return config;
};

// 初始化路由
const initRouter = function (app) {
  const router = new Router();
  require("../router.js")({ ...app, router });
  return router;
};

// 初始化控制器
const initController = function (app) {
  let controllers = {};
  scanFilesByFolder("../controller", (filename, controller) => {
    controllers[filename] = controller(app);
  });
  return controllers;
};

//初始化service
function initService(app) {
  let services = {};
  scanFilesByFolder("../service", (filename, service) => {
    services[filename] = service(app);
  });
  return services;
}
//初始化model
function initModel(app) {
  const crypto = require("crypto");
  //改成用sequelize
  // const sequelize = new Sequelize({
  //   dialect: "sqlite",
  //   storage: "sqliteDb.db",
  // });
  const sequelize = new Sequelize(
    app.$config.sequelize.database,
    app.$config.sequelize.username,
    app.$config.sequelize.password,
    app.$config.sequelize.options
  );

  // app上扩展两个属性
  app.$sequelize = sequelize;
  app.$db = sequelize;

  // 初始化model文件夹
  let models = {};
  scanFilesByFolder("../model", (filename, modelConfig) => {
    console.log(filename);
    models[filename] = modelConfig(sequelize, DataTypes);
  });

  // Synchronize the models with the database
  // Object.values(models).forEach(async (model) => await model.sync());
  for (let key of Object.keys(models)) {
    let model = models[key];
    model.sync();
  }
  //
  let password = "123456";
  const hmac = crypto.createHash("sha256", app.$config.crypto.secret);
  hmac.update(password.toString());
  password = hmac.digest("hex");
  // 如果不存在admin用户，则创建
  const User = models.User;
  User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      username: "admin",
      password: password,
      name: "admin",
      email: "",
    },
  });
  return models;
}

// 初始化中间件middleware
function initMiddleware(app) {
  let middleware = {};
  scanFilesByFolder("../middleware", (filename, middlewareConf) => {
    middleware[filename] = middlewareConf(app);
  });
  //初始化配置中间件
  if (app.$config.middleware && Array.isArray(app.$config.middleware)) {
    app.$config.middleware.forEach((mid) => {
      if (middleware[mid]) {
        app.$app.use(middleware[mid]);
      }
    });
  }
  return middleware;
}

// 初始化扩展
function initExtend(app) {
  scanFilesByFolder("../extend", (filename, extendFn) => {
    app["$" + filename] = Object.assign(
      app["$" + filename] || {},
      extendFn(app)
    );
  });
}

//加载定时任务
function initSchedule() {
  scanFilesByFolder("../schedule", (filename, scheduleConf) => {
    schedule.scheduleJob(scheduleConf.interval, scheduleConf.handler);
  });
}

module.exports = {
  initConfig,
  initController,
  initService,
  initRouter,
  initModel,
  initMiddleware,
  initExtend,
  initSchedule,
};
