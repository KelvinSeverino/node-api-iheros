import Sequelize from "sequelize";
import database from "../config/dbConnect.js";

const BattleLog = database.define('battle_log', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    heroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'heros',
            key: 'id'
        }
    },
    monstername: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: {
            args: [4, 255],
          }
        }
    },
    monsterrank: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        }
    },
    monsterlatitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    monsterlongitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    duration: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    inbattle: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
});

export default BattleLog;
