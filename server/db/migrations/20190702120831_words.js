exports.up = function(knex) {
    return knex.schema
        .createTable('word_parent', (t) => {
            t.increments('id').primary();
            t.integer('level').notNullable();
        })
        .createTable('language', (t) => {
            t.increments('id').primary();
            t.string('name', 30).unique().collate('utf8_bin').notNullable();
            t.string('symbol', 3).collate('utf8_bin').notNullable();
        })
        .createTable('word', (t) => {
            t.increments('id').primary();
            t.integer('parent_id').notNullable();
            t.integer('language_id').nullable();
            t.string("status", 20).collate('utf8_bin').nullable();
            t.text("word").collate('utf8_bin');
            t.integer('season').Nullable();
            t.integer('season_sort').Nullable();
        })
        .createTable('season', (t) => {
            t.increments('id').primary();
            t.integer('language_id').nullable();
            t.string("status", 20).collate('utf8_bin').nullable();
            t.text("name").collate('utf8_bin');
        })
        // .createTable('table_schema', (t) => {
        //     t.increments('id').primary();
        //     t.integer('parent_id').notNullable();
        //     t.integer('language_id').notNullable();
        //     t.integer("max_x").notNullable();
        //     t.integer("max_y").notNullable();
        //     t.string("schema", 30).nullable().collate('utf8_bin');
        //     t.string("status", 30).nullable().collate('utf8_bin');
        // });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("word_parent")
        .dropTable("language")
        .dropTable("word")
        .dropTable("table_schema");
};