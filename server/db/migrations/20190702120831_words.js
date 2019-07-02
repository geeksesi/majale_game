exports.up = function(knex) {
    return knex.schema
        .createTable('word_parent', (t) => {
            t.increments('id').primary();
            t.integer('level').notNullable();
        })
        .createTable('language', (t) => {
            t.increments('id').primary();
            t.string('name', 30).unique().collate('utf8_unicode_ci').notNullable();
            t.string('symbol', 3).collate('utf8_unicode_ci').notNullable();
        })
        .createTable('word', (t) => {
            t.increments('id').primary();
            t.integer('parent_id').notNullable();
            t.integer('language_id').nullable();
            t.string("status", 20).collate('utf8_unicode_ci');
            t.text("word").collate('utf8_unicode_ci');
        })
        .createTable('table_schema', (t) => {
            t.increments('id').primary();
            t.integer('parent_id').notNullable();
            t.integer('language_id').notNullable();
            t.integer("max_x").notNullable();
            t.integer("max_y").notNullable();
            t.string("schema", 30).nullable().collate('utf8_unicode_ci');
            t.string("status", 30).nullable().collate('utf8_unicode_ci');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("word_parent")
        .dropTable("language")
        .dropTable("word")
        .dropTable("table_schema");
};