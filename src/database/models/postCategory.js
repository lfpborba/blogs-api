module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
      primaryKey: true,
    }},
    {
      timestamps: false,
      tableName: 'PostCategories',
    });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'post',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    }),
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategory;
}