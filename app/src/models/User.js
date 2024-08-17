import Sequelize from "sequelize";
import database from "../config/dbConnect.js";
import bcrypt from 'bcryptjs';
const saltRounds = 12;

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: "Username must be unique"
        },
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            args: [4,20],
          }
        }
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email must be unique"
        },
        allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: true,
      }
    }
});

User.beforeSave(user => {
  return bcrypt.hash(user.password.toString(), saltRounds)
    .then(hash => user.password = hash)
    .catch(error => console.log(error))
});

User.prototype.validatePassword = async function (password) {
  return bcrypt.compare(password.toString(), this.password);
};

export default User;