const alphabet_array = ['چ', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ', 'ف', 'ق', 'ث', 'ص', 'ض', 'ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ', 'ؤ', 'ژ', 'و', 'پ', 'د', 'ذ', 'ر', 'ز', 'ط', 'ظ']

const answer_key = {
    2: [
        [0, 3],
        [0, 1],
        [1, 4],
        [7, 8],
        [4, 7],
        [2, 5],
        [1, 2],
        [4, 5],
        [4, 3],
        [2, 1],
        [4, 1],
        [6, 3],
        [3, 6],
        [3, 0]
    ],
    3: [
        [0, 3, 6],
        [0, 1, 2],
        [1, 4, 7],
        [6, 7, 8],
        [4, 7, 8],
        [2, 5, 4],
        [1, 2, 5],
        [4, 5, 8],
        [4, 3, 0],
        [2, 1, 4],
        [4, 1, 0],
        [6, 3, 4],
        [3, 6, 7],
        [3, 0, 1]
    ],
    4: [
        [0, 4, 8, 9],
        [0, 1, 2, 3],
        [1, 5, 9, 10],
        [6, 7, 11, 10],
        [4, 8, 9, 10],
        [2, 6, 7, 11],
        [1, 2, 6, 10],
        [4, 5, 9, 8],
        [4, 5, 6, 7],
        [2, 1, 0, 4],
        [4, 0, 1, 2],
        [6, 7, 11, 10],
        [3, 2, 6, 10],
        [3, 2, 1, 0]
    ],
    5: [
        [0, 4, 8, 9, 5],
        [0, 1, 2, 6, 7],
        [1, 5, 6, 10, 9],
        [6, 7, 11, 10, 9],
        [4, 8, 9, 10, 6],
        [2, 6, 7, 11, 10],
        [1, 2, 6, 7, 3],
        [4, 5, 9, 10, 6],
        [4, 5, 6, 7, 3],
        [2, 1, 0, 4, 8],
        [4, 0, 1, 2, 3],
        [6, 7, 11, 10, 9],
        [3, 2, 6, 10, 9],
        [3, 2, 1, 5, 4]
    ],
    6: [
        [0, 4, 8, 9, 5, 1],
        [0, 1, 2, 6, 7, 11],
        [1, 5, 9, 10, 11, 7],
        [6, 7, 11, 10, 9, 8],
        [4, 8, 9, 10, 6, 2],
        [2, 6, 7, 11, 10, 9],
        [1, 2, 6, 7, 11, 10],
        [4, 5, 9, 10, 6, 2],
        [4, 5, 6, 7, 3, 2],
        [2, 1, 0, 4, 8, 9],
        [4, 0, 1, 2, 3, 7],
        [6, 7, 11, 10, 9, 8],
        [3, 2, 6, 10, 9, 5],
        [3, 2, 1, 5, 4, 0]
    ],
    7: [
        [0, 5, 10, 15, 20, 21, 22],
        [0, 1, 6, 11, 12, 13, 14],
        [1, 2, 3, 4, 9, 8, 13],
        [6, 7, 12, 11, 10, 15, 16],
        [4, 9, 14, 13, 12, 17, 18],
        [2, 7, 12, 13, 14, 19, 18],
        [1, 2, 3, 4, 9, 8, 13],
        [4, 9, 8, 7, 6, 5, 0],
        [4, 3, 2, 1, 0, 5, 6],
        [2, 1, 0, 5, 6, 11, 16],
        [4, 9, 8, 7, 6, 5, 10],
        [6, 7, 8, 9, 14, 19],
    ],
    8: [
        [0, 5, 10, 15, 20, 21, 22, 23],
        [0, 1, 6, 11, 12, 13, 14, 19],
        [1, 2, 3, 4, 9, 8, 13, 18],
        [6, 7, 12, 11, 10, 15, 16, 17],
        [4, 9, 14, 13, 12, 17, 18, 19],
        [2, 7, 12, 13, 14, 19, 18, 17],
        [1, 2, 3, 4, 9, 8, 13, 12],
        [4, 9, 8, 7, 6, 5, 0, 1],
        [4, 3, 2, 1, 0, 5, 10, 15],
        [2, 1, 0, 5, 6, 11, 16, 21],
    ],
    9: [
        [0, 5, 10, 15, 20, 21, 22, 23, 18],
        [0, 1, 6, 11, 12, 13, 14, 19, 18],
        [1, 2, 3, 4, 9, 8, 13, 18, 19],
        [6, 7, 12, 11, 10, 15, 16, 17, 18],
        [4, 9, 14, 13, 12, 17, 18, 19, 24],
        [2, 7, 12, 13, 14, 19, 18, 17, 16],
    ],
    10: [
        [0, 5, 10, 15, 20, 21, 22, 23, 18, 13],
        [0, 1, 6, 11, 12, 13, 14, 19, 18, 17],
        [1, 2, 3, 4, 9, 8, 13, 18, 19, 14],
        [6, 7, 12, 11, 10, 15, 16, 17, 18, 19],
        [4, 9, 14, 13, 12, 17, 18, 19, 24, 23],
        [2, 7, 12, 13, 14, 19, 18, 17, 16, 11],
    ],
    11: [
        [0, 5, 10, 15, 20, 21, 22, 23, 18, 13, 8],
        [0, 1, 6, 11, 12, 13, 14, 19, 18, 17, 16],
        [1, 2, 3, 4, 9, 8, 13, 18, 19, 14, 9],
        [6, 7, 12, 11, 10, 15, 16, 17, 18, 19, 24],
        [4, 9, 14, 13, 12, 17, 18, 19, 24, 23, 22],
        [2, 7, 12, 13, 14, 19, 18, 17, 16, 11, 6],
    ],
};



/**
 * @returns {keys[Array] , word : [Array]} 
 */
async function size_three(size, word_array, length, cb) {
    let ret = {
        keys: [],
        word: []
    };
    let keys = await answer_key[size][Math.floor(Math.random() * answer_key[size].length)];
    // console.log(answer_key[size][Math.floor(Math.random() * answer_key[size].length)]);
    ret.keys = keys;

    for (let i = 0; i < length; i++) {
        if (keys.indexOf(i) !== -1) {
            await ret.word.push(word_array[keys.indexOf(i)]);
        } else {
            await ret.word.push(alphabet_array[Math.floor(Math.random() * alphabet_array.length)]);
        }
    }
    let wait_for_it = setInterval(() => {
        if (ret.word.length === length) {
            clearInterval(wait_for_it);
            // console.log(ret)
            cb(ret);
        }
    }, 500);
}


function make_table(word) {
    return new Promise((resolve, reject) => {
        let word_array = word.split('');
        switch (word_array.length) {
            case 2:
                size_three(2, word_array, 9, res => {

                    resolve({ array: res.word, size: 3, keys: res.keys })
                })
                break;
            case 3:
                size_three(3, word_array, 9, res => {

                    resolve({ array: res.word, size: 3, keys: res.keys })
                })
                break;
            case 4:
                size_three(4, word_array, 16, res => {

                    resolve({ array: res.word, size: 4, keys: res.keys })
                })
                break;
            case 5:
                size_three(5, word_array, 16, res => {

                    resolve({ array: res.word, size: 4, keys: res.keys })
                })
                break;
            case 6:
                size_three(6, word_array, 16, res => {

                    resolve({ array: res.word, size: 4, keys: res.keys })
                });
                break;
            case 7:
                size_three(7, word_array, 25, res => {

                    resolve({ array: res.word, size: 5, keys: res.keys })
                })
                break;
            case 8:
                size_three(8, word_array, 25, res => {

                    resolve({ array: res.word, size: 5, keys: res.keys })
                })
                break;
            case 9:
                size_three(9, word_array, 25, res => {

                    resolve({ array: res.word, size: 5, keys: res.keys })
                })
                break;
            case 10:
                size_three(10, word_array, 25, res => {

                    resolve({ array: res.word, size: 5, keys: res.keys })
                })
                break;
            case 11:
                size_three(11, word_array, 25, res => {

                    resolve({ array: res.word, size: 5, keys: res.keys })
                })
                break;
        }
    })
}



export {
    make_table,

}