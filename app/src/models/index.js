import User from "./User.js";
import Hero from "./Hero.js";
import BattleLog from "./BattleLog.js";

// Define os relacionamentos
User.hasMany(Hero, { foreignKey: 'userId' });
Hero.belongsTo(User, { foreignKey: 'userId' });

// Definir a associação
Hero.hasMany(BattleLog, { foreignKey: 'heroId' });
BattleLog.belongsTo(Hero, { foreignKey: 'heroId' });

export { User, Hero, BattleLog };