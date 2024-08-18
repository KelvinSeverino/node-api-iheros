import "dotenv/config";
import app from "./src/app.js";
import syncDatabase from './src/services/database/syncDatabase.js';
import runSeeders from "./src/services/database/runSeeders.js";
import { initializeSocket } from "./src/services/socket/socketService.js";

const PORT = process.env.APP_LOCAL_PORT;

const startServer = async () => {
    try { 
        await syncDatabase();
        //await runSeeders(); 
  
        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}!`);
        });

        initializeSocket();
    } catch (error) {
        console.error(
            'Não foi possível iniciar o servidor devido a um erro na sincronização do banco de dados:', 
            error
        );
        process.exit(1);
    }
};

startServer();