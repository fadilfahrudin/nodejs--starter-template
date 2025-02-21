'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Profile.init({
    profilePicture: DataTypes.TEXT
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Profile',
    deletedAt: 'deletedAt',
  });
  return Profile;
};