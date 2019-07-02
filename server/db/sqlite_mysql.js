// const db = require('better-sqlite3')('my.db', {readonly : true});

// const medias = db.prepare("SELECT MediaID FROM Media").all();

// const words = db.prepare("SELECT Word FROM Words WHERE MediaID=?").all(8);

// console.log(words);
const knex = require('knex');

const mysqlDB = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'javadkhof',
        database: 'Kalemat'
    }
});
const sqliteDB = knex({
    client: 'sqlite3',
    connection: {
        filename: "./my.db"
    }
});

// sqliteDB({ a: 'Media', b: 'Words' }).select({
//         // media_id: 'a.MediaID'
//         word: 'b.Word'
//     })
//     .where('b.MediaID', '=', 8)
//     .then(function(row) {
//         // console.log(row);
//     })

// sqliteDB.select("LanguageName", "LanguageCode")
//     .from('Languages')
//     // .where('MediaID', '=', 16)
//     .map(row => {
//         // console.log(row)
//         mysqlDB('language').insert({ name: row.LanguageName, symbol: row.LanguageCode })
//             .then(res => {})
//             .catch(e => {
//                 console.log(e)
//             })
//     });
let rows = [];
let counter = 0;
sqliteDB.select("MediaID", "LevelDifficulty")
    .from('Media')
    // .where('MediaID', '=', 16)
    .then(row => {
        // console.log(row)
        Object.keys(row).map(function(key, index) {
                // mysqlDB('word_parent').insert({ level: row[key].LevelDifficulty })
                //     .then(res => {})
                //     .catch(e => {
                //         console.log(e)
                //     })
                //     // counter++;
                //     // console.log(counter)
                sqliteDB.select("LanguageID", "Word")
                    .from("Words")
                    .where("MediaID", '=', row[key].MediaID)
                    .then(words => {

                        
                        Object.keys(row).map(function(key2, index2) {
                            //         // if (typeof words[key2] === 'undefined') { continue; }
                            //             // console.log(words[1].LanguageID + " :: "+ counter);
                            make_array(words[key2], key)

                            })
                        // .catch(e => {});
                    })
            })
            // console.log(typeof row);
            // row.forEach(res => {

        // })
        let cm = 0;

        function make_array(words, key) {
            if (typeof words === 'undefined') { return false; }
            cm++;
            let tmp_obj = {
                parent_id: (key + 1),
                language_id: words.LanguageID,
                word: words.Word
            }
            rows.push(tmp_obj);
            if (cm > 312395) {
                console.log("i'm here")
                mysqlDB.batchInsert('word', rows, 312397)
                    .then(res => {})
                    .catch(e => {
                        console.log(e)
                    })
            }
            return true;
        }

        console.log(rows);
    })