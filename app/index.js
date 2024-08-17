import "dotenv/config";
import app from "./src/app.js";
import syncDatabase from './src/services/syncDatabase.js';

const PORT = process.env.APP_LOCAL_PORT;

const startServer = async () => {
    try {
        await syncDatabase(); 
  
        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}!`);
        });
    } catch (error) {
        console.error(
            'Não foi possível iniciar o servidor devido a um erro na sincronização do banco de dados:', 
            error
        );
        process.exit(1);
    }
};

startServer();