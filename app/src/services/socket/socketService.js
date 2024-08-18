import io from 'socket.io-client';
import { allocateHero } from '../hero/heroService.js';

export const initializeSocket = () => {
    const socket = io('https://zrp-challenges-dev-production.up.railway.app/');

    socket.on('connect', () => {
        console.log('Conectado ao serviço de ameaças.');
    });

    socket.on('occurrence', async (data) => {
        //console.log('Nova ameaça detectada:', data);
        await allocateHero(data);
    });

    socket.on('disconnect', () => {
        console.log('Desconectado do serviço de ameaças.');
    });

    return socket;
};
