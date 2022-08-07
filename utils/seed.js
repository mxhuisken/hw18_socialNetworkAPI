const connection = require("../config/connection");
const { user, thought } = require("../models");

const userSeed = [
    {
        username: 'userOne',
        email: 'userOne@gmail.com',
    },
    {
        username: 'userTwo',
        email: 'userTwo@gmail.com',
    },
    {
        username: 'userThree',
        email: 'userThree@gmail.com',
    },
    {
        username: 'userFour',
        email: 'userFour@gmail.com',
    },
]


connection.once("open", async () => {

    // DEL EXISTING SEED
    await user.deleteMany({});
    await thought.deleteMany({});

    // INSERT TO DB
    await user.collection.insertMany(userSeed);
    console.log("Users successfully seeded!");

    console.info(' * Seeding complete! * ');
    console.table(userSeed)
    process.exit(0);
});