import User from '../../models/User.js';

export const userSeeder = async () => {
    const users = [
        {
            username: "kelvin",
            email: "kelvin@email.com",
            password: 1234
        }
    ];

    for (const user of users) {
        await User.create(user);
    }
};

export const down = async () => {
    await User.destroy({ where: {}, truncate: true });
};