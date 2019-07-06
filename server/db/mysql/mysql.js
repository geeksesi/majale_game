const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1:3206',
        user: 'geeksesi',
        password: 'x7rYYtXq',
        database: 'majale'
    }
});

function get_sesson(language_id, limit = 10, page = 0, cb) {
    db.select('*')
        .from('season')
        .where('language_id', language_id)
        .limit(limit)
        .offset(limit*page)
        .then(seasons => cb({ ok: true, date: seasons }))
        .catch(e => cb({ ok: false, error: e }))
    }
    
    db.select('*')
        .from('word')
        .limit(5)
        .then(seasons => console.log(res))
        .catch(e => console.log(e))



module.exports = {
    get_sesson,

}