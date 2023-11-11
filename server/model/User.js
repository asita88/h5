module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "username不能为空" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password不能为空" },
        },
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );

  return User;
};
