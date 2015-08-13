'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
    validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len:[8,99],
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // models.user.hasMany(models.favorite);
      }
    }
  });
  return user;
};