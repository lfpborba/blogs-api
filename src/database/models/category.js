module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    updatedAt: false,
    underscored: true,
    tableName: 'Categories',
  });

  Category.associate = (models) => {
    User.hasMany(models.PostCategories, {
      foreignKey: 'categoryId',
      as: 'postCategory',
    })
  }
  return Category;
}