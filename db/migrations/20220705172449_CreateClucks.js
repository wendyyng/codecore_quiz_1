/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('clucks',table=>{
        table.increments('id');
        table.string('username');
        table.string('image_url');
        table.string('content',1000);
        table.timestamps(true,true);
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('clucks')
};
