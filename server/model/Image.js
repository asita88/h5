module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      author: DataTypes.STRING,
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );

  return Image;
};
