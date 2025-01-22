'use strict';
const { Model, where } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: 'userId',
        as: 'profile',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role:{
      type: DataTypes.ENUM,
      values: ['superadmin', 'admin', 'user'],
      allowNull: false,
      validate:{
        isIn: {
          args: [['superadmin', 'admin', 'user']],
          msg: 'Invalid role'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      allowNull: false,
      defaultValue: 'inactive'
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
    deletedAt: 'deletedAt',
    hooks:{
      async beforeDestroy(user){
        const profile = await sequelize.models.Profile.findOne({
          where:{
            userId: user.id
          }
        })

        if (profile){
          await profile.destroy()
        }
      }
    }
  });
  return User;
};