'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // "Setiap User memiliki satu Profile. Jika User dihapus, Profile yang terkait juga ikut terhapus."
      User.hasOne(models.Profile, {
        foreignKey: 'userId',
        as: 'userProfile',
        onDelete: 'CASCADE', // jika user dihapus, maka profile dihapus
        onUpdate: 'CASCADE'
      });
      // Setiap user dimiliki oleh satu role, jika role dihapus, user tetap ada
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
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
    roleId: {  
      type: DataTypes.INTEGER,
      allowNull: true,  
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastLoginAttempt: {
      type: DataTypes.DATE,
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
    hooks: {
      async beforeDestroy(user, options) {
        // Soft delete Profile
        await sequelize.models.Profile.update(
          { deletedAt: new Date() }, 
          { where: { userId: user.id } }
        );
      }
    }
  });
  return User;
};