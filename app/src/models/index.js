import User from "./User.js";
import Hero from "./Hero.js";

// Define os relacionamentos
User.hasMany(Hero, { foreignKey: 'userId' });
Hero.belongsTo(User, { foreignKey: 'userId' });

export { User, Hero };