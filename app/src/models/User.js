import Sequelize from "sequelize";
import database from "../config/dbConnect.js";

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

export default User;