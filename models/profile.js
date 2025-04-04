'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // "Setiap Profile dimiliki oleh satu User. Jika User dihapus, Profile yang terkait juga ikut terhapus."
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE', // Jika user dihapus, profile dihapus
        onUpdate: 'CASCADE'
      })
    }
  }
  Profile.init({
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false, // Profile harus selalu memiliki user
      references: {
        model: 'Users', // Nama tabel User
        key: 'id'
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: DataTypes.TEXT,
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Profile',
    deletedAt: 'deletedAt',
  });
  return Profile;
};