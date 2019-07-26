function make_table(word) {
    return new Promise((resolve, reject) => {
        let word_array = word.split('');
        switch (word_array.length) {
            case 2:
                resolve({ array: ["س", word_array[0], "ا", "م", word_array[1], "و", "ب", "ی", "چ"], size: 3, keys : [1,4] })
                break;
            case 3:
                resolve({ array: ["س", word_array[0], "ا", "م", word_array[1], "و", "ب", word_array[2], "چ"], size: 3, keys : [1,4,7] })
                break;
            case 4:
                resolve({ array: [word_array[0], "س", "ا", "م", word_array[1], word_array[2], word_array[3], "ب", "چ", "س", "ی", "ص", "ف", "غ", "ع", "خ"], size: 4, keys : [0,4,5,6] })
                break;
            case 5:
                resolve({ array: ["س", word_array[0], "ا", "م", "م", word_array[1], "س", "ب", word_array[3], word_array[2], "ت", "ف", word_array[4], "ص", "س", "خ"], size: 4, keys : [1,5,9,8,12] })
                break;
            case 6:
                resolve({ array: [word_array[0], word_array[1], word_array[2], word_array[3], "س", "ق", word_array[5], word_array[4], "ا", "ی", "ش", "ص", "ق", "غ", "ه", "خ"], size: 4, keys : [0,1,2,3,7,6] })
                break;
            case 7:
                resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], "و", "ش", "م", "ی", "گ", "ذ", "ر", "ه", "ب", "ب", "م", "ج", "خ"], size: 5, keys : [1,6,11,12,13,8,9] })
                break;
            case 8:
                resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", "ی", "گ", "ذ", "ر", "ه", "ب", "ب", "م", "ج", "خ"], size: 5 ,keys : [1,6,11,12,13,8,9,14]})
                break;
            case 9:
                resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", "ی", "گ", word_array[8], "ر", "ه", "ب", "ب", "م", "ج", "خ"], size: 5,keys : [1,6,11,12,13,8,9,14,19] })
                break;
            case 10:
                resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", "ی", word_array[9], word_array[8], "ر", "ه", "ب", "ب", "م", "ج", "خ"], size: 5,keys : [1,6,11,12,13,8,9,14,19,18] })
                break;
            case 11:
                resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", word_array[10], word_array[9], word_array[8], "ر", "ه", "ب", "ب", "م", "ج", "خ"], size: 5,keys : [1,6,11,12,13,8,9,14,19,18,17] })
                break;
        }
    })
}



export {
    make_table,

}