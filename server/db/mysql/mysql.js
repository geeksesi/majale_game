const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: 's7.liara.ir',
        port: '32761',
        user: 'root',
        password: '20bRQYqphdPObGd09hXfrdxG',
        database: 'majale'
    }
});

function get_sesson(language_id, cb) {
    db.select('*')
        .from('season')
        .where('language_id', language_id)
        // .limit(limit)
        // .offset(limit * page)
        .then(seasons => { cb({ ok: true, data: seasons }) })
        .catch(e => { cb({ ok: false, error: e }) })
}

function words_season(season_id, answer_language_id, cb) {
    db.select('id', 'parent_id', 'language_id', 'season_sort', 'word', 'status')
        .from('word')
        .where('season_id', season_id)
        .andWhereNot('status', null)
        .andWhereNot('status', 0)
        .then(question_words => {
            let count = 0;
            Object.keys(question_words).map(q_word => {
                db.select('word', 'language_id')
                    .from('word')
                    .where('parent_id', question_words[q_word].parent_id)
                    .andWhere('language_id', answer_language_id)
                    .then(answer_word => {
                        question_words[q_word].answer = answer_word[0];
                        if ((count + 1) === question_words.length) {
                            cb({ ok: true, data: question_words });
                        } else {
                            count++;
                        }
                    })
                    .catch(e => cb({ ok: false, error: e }))
            })
        })
        .catch(e => cb({ ok: false, error: e }))
}

// words_season(1, 1, res => console.log(res))

module.exports = {
    get_sesson,
    words_season,
}