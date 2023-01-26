const sequelize = require('../config/connection');
const { User } = require('../models'); //change to ../models later

const userData = require('./userdata.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
 
    process.exit(0);
};

seedDatabase();