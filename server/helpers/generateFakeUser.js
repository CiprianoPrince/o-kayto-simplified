const { faker } = require('@faker-js/faker');
const fs = require('fs');
module.exports = () => {
    const userID = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName + lastName}@gmail.com`;
    const password = faker.internet.password();
    const dateRegistered = faker.date.anytime();
    const createdAt = faker.date.anytime();
    const updatedAt = faker.date.anytime();

    const fakeUser = {
        userID,
        firstName,
        lastName,
        email,
        password,
        dateRegistered,
        createdAt,
        updatedAt,
    };

    fs.writeFile('fakeUser.json', JSON.stringify(fakeUser), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    return {
        userID,
        firstName,
        lastName,
        email,
        password,
        dateRegistered,
        createdAt,
        updatedAt,
    };
};
