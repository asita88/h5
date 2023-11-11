module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "JoinUs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      page_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ip: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      whatsApp: DataTypes.STRING,
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );

  return Image;
};
