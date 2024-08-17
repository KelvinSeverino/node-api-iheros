import sequelize from '../config/dbConnect.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
    throw error;
  }
};

export default syncDatabase;