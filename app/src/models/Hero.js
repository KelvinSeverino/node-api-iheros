import Sequelize from "sequelize";
import database from "../config/dbConnect.js";

const Hero = database.define('hero', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
    },
    heroname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: true,
          len: {
            args: [4,20],
          }
        }
    },
    heroclass: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: {
            args: [1,1],
          }
        }
    },
    latitude: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    longitude: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
});

export default Hero;