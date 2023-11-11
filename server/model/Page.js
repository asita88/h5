module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    "Page",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: "未命名场景",
      },
      coverImage: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      shareConfig: {
        type: DataTypes.JSON,
        defaultValue: {
          shareWx: false,
          coverImage: "",
          title: "",
          description: "",
        },
      },
      pages: {
        type: DataTypes.JSON,
        defaultValue: {
        },
      },
      script: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      author: DataTypes.STRING,
      width: {
        type: DataTypes.INTEGER,
        defaultValue: 375,
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: 644,
      },
      pageMode: {
        type: DataTypes.STRING,
        defaultValue: "h5",
      },
      flipType: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      slideNumber: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      add_time: DataTypes.INTEGER,
      up_time: DataTypes.INTEGER,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      isPublish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isTemplate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // members: DataTypes.ARRAY(DataTypes.STRING),
      version: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );

  return Page;
};
