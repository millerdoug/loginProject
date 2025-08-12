const user = require('../models/User.model');

async function seedDatabase() {
    await user.deleteMany({});

    await user.insertMany([{
        username: "testuser",
        group: undefined,
        newGroupToAccept: false,
        newGroup: undefined,
        activated: true,
        owner: true,
        password: "$2b$10$Cacuw9GqchELU3175/3c1uIl1FO/pqBoN1PQ5naFiX2N2QClKYo1u",
        dateTime: "Fri Jun 13 2025"
    }, {
        username: "testuser2@test.com",
        group: "testuser",
        activated: false,
        newGroupToAccept: true,
        newGroup: undefined,
        owner: false,
        password: "$2b$10$Cacuw9GqchELU3175/3c1uIl1FO/pqBoN1PQ5naFiX2N2QClKYo1u",
        dateTime: "Fri Jun 13 2025"
    }, {
        username: "testuser3@test.com",
        group: undefined,
        activated: false,
        newGroupToAccept: false,
        newGroup: undefined,
        owner: false,
        password: "$2b$10$Cacuw9GqchELU3175/3c1uIl1FO/pqBoN1PQ5naFiX2N2QClKYo1u",
        dateTime: "Fri Jun 13 2025"
    }, {
        username: "testuser4@test.com",
        group: undefined,
        activated: false,
        newGroupToAccept: true,
        newGroup: 'groiup',
        owner: false,
        password: "$2b$10$Cacuw9GqchELU3175/3c1uIl1FO/pqBoN1PQ5naFiX2N2QClKYo1u",
        dateTime: "Fri Jun 13 2025"
    }])
}

module.exports = seedDatabase;