import Hero from '../../models/Hero.js';

export const heroSeeder = async () => {
    const heroes = [
        {
            userId: 1,
            heroname: "All Might",
            heroclass: "S",
            latitude: -23.100479,
            longitude: -45.705434
        },
        {
            userId: 1,
            heroname: "Saitama",
            heroclass: "S",
            latitude: 34.052235,
            longitude: -118.243683
        },
        {
            userId: 1,
            heroname: "Deku",
            heroclass: "B",
            latitude: 40.730610,
            longitude: -73.935242
        },
        {
            userId: 1,
            heroname: "Endeavor",
            heroclass: "A",
            latitude: 37.774929,
            longitude: -122.419418
        },
        {
            userId: 1,
            heroname: "Todoroki",
            heroclass: "B",
            latitude: 51.507351,
            longitude: -0.127758
        },
        {
            userId: 1,
            heroname: "Bakugo",
            heroclass: "C",
            latitude: 35.689487,
            longitude: 139.691711
        },
        {
            userId: 1,
            heroname: "Mirko",
            heroclass: "S",
            latitude: -33.868820,
            longitude: 151.209296
        },
        {
            userId: 1,
            heroname: "Gran Torino",
            heroclass: "A",
            latitude: 48.856613,
            longitude: 2.381233
        },
        {
            userId: 1,
            heroname: "Hawks",
            heroclass: "B",
            latitude: 55.755825,
            longitude: 37.617298
        },
        {
            userId: 1,
            heroname: "Aizawa",
            heroclass: "C",
            latitude: 39.904202,
            longitude: 116.407394
        },
        {
            userId: 1,
            heroname: "Goku",
            heroclass: "S",
            latitude: 35.689487,
            longitude: 139.691711
        },
        {
            userId: 1,
            heroname: "Vegeta",
            heroclass: "A",
            latitude: 40.712776,
            longitude: -74.005974
        },
        {
            userId: 1,
            heroname: "Gohan",
            heroclass: "B",
            latitude: 34.052235,
            longitude: -118.243683
        },
        {
            userId: 1,
            heroname: "Piccolo",
            heroclass: "A",
            latitude: 51.507351,
            longitude: -0.127758
        },
        {
            userId: 1,
            heroname: "Krillin",
            heroclass: "B",
            latitude: 48.856613,
            longitude: 2.381233
        },
        {
            userId: 1,
            heroname: "Trunks",
            heroclass: "C",
            latitude: 39.904202,
            longitude: 116.407394
        },
        {
            userId: 1,
            heroname: "Android 18",
            heroclass: "S",
            latitude: 55.755825,
            longitude: 37.617298
        },
    ];

    for (const hero of heroes) {
        await Hero.create(hero);
    }
};

export const down = async () => {
    await Hero.destroy({ where: {}, truncate: true });
};