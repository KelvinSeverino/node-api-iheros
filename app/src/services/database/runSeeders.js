import { userSeeder } from '../../database/seeders/20240817-user-seeder.js';
import { heroSeeder } from '../../database/seeders/20240817-hero-seeder.js';
import database from '../../config/dbConnect.js';

const runSeeders = async () => {
    try {
        await database.authenticate(); // Conecta ao banco de dados
        await userSeeder();
        await heroSeeder(); 
        console.log('Seeder executed successfully.');
    } catch (error) {
        console.error('Error executing seeder:', error);
    } finally {
        await database.close(); // Fecha a conexão com o banco de dados
    }
};

export default runSeeders;
