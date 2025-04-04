'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users',
        onDelete: 'SET NULL', // Jika role dihapus, user tetap ada
        onUpdate: 'CASCADE'
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    }
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Role',
    deletedAt: 'deletedAt',
  });
  return Role;
};