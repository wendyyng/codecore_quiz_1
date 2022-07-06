const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  return knex('clucks').del()
  .then(function () {
    const clucks = []
    for (let i = 0; i < 10; i++) {
      clucks.push(
        {
          username: "anonymous",
          content: faker.company.catchPhrase(),
          image_url: faker.image.imageUrl(),
        }
    )
    }
    return knex('clucks').insert(clucks)
  });
};
