module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "WhatsApp",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      author: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      show_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      max_show: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      join_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      max_join: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      interval: {
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

  return Image;
};
