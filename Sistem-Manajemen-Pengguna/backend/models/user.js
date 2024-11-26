'use strict';
const {
  Model
} = require('sequelize');
const { passwordHash } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already registered"
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Must have an email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: 8,
          msg: 'Password must be at least 8 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Staff'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((el) => {
    el.password = passwordHash(el.password)
  })
  return User;
};