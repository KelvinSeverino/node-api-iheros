import BattleLog from '../../models/BattleLog.js';
import Hero from '../../models/Hero.js';

function calculateDistance(pointA, pointB) {
    const toRad = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371; // Raio da Terra em quilômetros

    const lat1 = toRad(pointA.lat);
    const lon1 = toRad(pointA.lng);
    const lat2 = toRad(pointB.lat);
    const lon2 = toRad(pointB.lng);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distância em quilômetros
}

function getHeroRankAndBattleTime(dangerLevel) {
    let requiredRank;
    let minTimeInMinutes, maxTimeInMinutes;

    switch(dangerLevel) {
        case 'God':
            requiredRank = 'S';
            minTimeInMinutes = 5; // 5 minutos
            maxTimeInMinutes = 10; // 10 minutos
            break;
        case 'Dragon':
            requiredRank = 'A';
            minTimeInMinutes = 2; // 2 minutos
            maxTimeInMinutes = 5; // 5 minutos
            break;
        case 'Tiger':
            requiredRank = 'B';
            minTimeInMinutes = 0.17; // Aproximadamente 10 segundos em minutos
            maxTimeInMinutes = 0.33; // Aproximadamente 20 segundos em minutos
            break;
        case 'Wolf':
            requiredRank = 'C';
            minTimeInMinutes = 0.017; // Aproximadamente 1 segundo em minutos
            maxTimeInMinutes = 0.033; // Aproximadamente 2 segundos em minutos
            break;
        default:
            throw new Error(`Nível de perigo desconhecido: ${dangerLevel}`);
    }

    return { requiredRank, minTimeInMinutes, maxTimeInMinutes };
}

async function getHeroesByRank(requiredRank) {
    return await Hero.findAll({
        where: {
            heroclass: requiredRank,
        }
    });
}

async function getAvailableHeroesByRank(requiredRank) {
    const heroes = await Hero.findAll({
        where: { heroclass: requiredRank }
    });

    // Obter IDs dos heróis que estão em batalha
    const inBattleHeroIds = await BattleLog.findAll({
        where: { inbattle: true },
        attributes: ['heroId'],
        group: ['heroId']
    }).then(results => results.map(log => log.heroId));

    // Filtrar heróis que não estão em batalha
    const availableHeroes = heroes.filter(hero => !inBattleHeroIds.includes(hero.id));

    return availableHeroes;
}

function findNearestHero(heroes, threatLocation) {
    let selectedHero = null;
    let shortestDistance = Infinity;

    heroes.forEach(hero => {
        const distance = calculateDistance(
            { lat: threatLocation.lat, lng: threatLocation.lng }, 
            { lat: hero.latitude, lng: hero.longitude }
        );
        if (distance < shortestDistance) {
            shortestDistance = distance;
            selectedHero = hero;
        }
    });

    return selectedHero;
}

async function simulateBattle(hero, monsterName, monsterRank, minTimeInMinutes, maxTimeInMinutes, battleLogId) {
    // Converter minutos para milissegundos
    const minTime = minTimeInMinutes * 60 * 1000;
    const maxTime = maxTimeInMinutes * 60 * 1000;

    const battleTime = Math.random() * (maxTime - minTime) + minTime; // Tempo aleatório entre minTime e maxTime
    console.log(`---------\nHerói ${hero.heroname} Classe ${hero.heroclass} alocado para combater ${monsterName} de Rank ${monsterRank}`);
    console.log(`Batalha vai durar aproximadamente ${(battleTime / (60 * 1000)).toFixed(2)} minutos\n---------`);

    setTimeout(async () => {
        console.log(`Herói ${hero.heroname} finalizou a batalha contra ${monsterName} de Rank ${monsterRank}`);

        // Atualizar o log da batalha
        try {
            await BattleLog.update({ inbattle: false, duration: (battleTime / (60 * 1000)) }, { where: { id: battleLogId } });
        } catch (error) {
            console.log(`Falha ao atualizar dados da batalha ${battleLogId} entre ${hero.heroname} contra ${monsterName}`);
        }
    }, battleTime);
}

export const allocateHero = async (threat) => {
    const { location, dangerLevel, monsterName, monster } = threat;

    if (!location || !location[0] || !dangerLevel || !monsterName || !monster) {
        console.error('Dados da ameaça incompletos ou inválidos');
        return;
    }

    try {
        const { requiredRank, minTimeInMinutes, maxTimeInMinutes } = getHeroRankAndBattleTime(dangerLevel);

        const availableHeroes = await getAvailableHeroesByRank(requiredRank);
        if (availableHeroes.length === 0) {
            console.log(`Nenhum herói disponível para combater ${monsterName} de Rank ${dangerLevel} em ${location[0].lat}, ${location[0].lng}`);
            return;
        }

        const nearestHero = findNearestHero(availableHeroes, location[0]);

        if (nearestHero) {
            // Criar um log de batalha
            const battleLog = await BattleLog.create({
                heroId: nearestHero.id,
                monstername: monster.name,
                monsterrank: dangerLevel,
                monsterlatitude: location[0].lat,
                monsterlongitude: location[0].lng,
                duration: 0, // Temporariamente 0, será atualizado após a batalha
                inbattle: true
            });

            console.log(`\n---------`);
            console.log(`Monstro: ${monster.name}`);
            console.log(`Descrição: ${monster.description}`);
            console.log(`Imagem: ${monster.url}`);
            simulateBattle(nearestHero, monsterName, dangerLevel, minTimeInMinutes, maxTimeInMinutes, battleLog.id);
        } else {
            console.log(`Nenhum herói disponível para combater ${monsterName} em ${location[0].lat}, ${location[0].lng}`);
        }

    } catch (error) {
        console.error(`Erro ao alocar herói: ${error.message}`);
    }
};
