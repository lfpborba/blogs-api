module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    published: { 
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    updatedAt: false,
    underscored: true,
    tableName: 'BlogPost',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    }),

    BlogPost.hasMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'postCategory',
    })
  }
  return BlogPost;
}