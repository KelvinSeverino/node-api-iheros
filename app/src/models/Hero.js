import Sequelize, { ValidationError } from "sequelize";
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
        unique: false,
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
}, {
  hooks: {
      beforeSave: (hero, options) => {
          if (!validateCoordinates(hero.latitude, hero.longitude)) {
              throw new ValidationError(null, [{message:'Coordenadas inválidas;'}]);
          }
      }
  }
});

const validateCoordinates = (latitude, longitude) => {
  const isValidNumber = (value) => !isNaN(value) && isFinite(parseFloat(value));

  const lat = parseFloat(latitude);
  if (lat == '' || !isValidNumber(lat) || lat < -90 || lat > 90) {
      return false;
  }

  const lon = parseFloat(longitude);
  if (lon == '' || !isValidNumber(lon) || lon < -180 || lon > 180) {
      return false;
  }

  return true;
};

export default Hero;