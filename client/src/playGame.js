import { get_word } from './server';
import { resolve } from "upath";

class playGame extends Phaser.Scene {

    constructor() {
        super({ key: 'playGame' });
    }

    init(data) {
        this.season_id = data.season_id;
        this.word_id = data.word_id;
        console.log(data)
    }
    preload() {

    }

    async create() {
        this.word_data = await get_word(this.season_id);
        this.question = this.word_data[this.word_id].word
        this.status = this.word_data[this.word_id].status
        this.answer = this.word_data[this.word_id].answer.word
            // this.words =this.add.group()
            // this.add.grid(0, 0, 50 * 6, 50 * 5, 50, 50, 0x999999, 1, 0x666666).setOrigin(0);

        this.graphics = this.add.graphics({ fillStyle: { color: 0x9e9e9e } });

        this.till_bg = [];
        // this.words = ["س", "ل", "ا", "م", "خ", "و", "ب", "ی", "چ", "خ", "ب", "ر", "ا", "خ", "و", "ش", "م", "ی", "گ", "ذ", "ر", "ه", "ب", "ب", "م", "ج"];
        let table = await this.make_table(this.answer);
        this.words = table.array;
        this.till_words = []
            // const max_x = 3;
            // const max_y = 3;
        this.max_x = table.size;
        this.max_y = table.size;
        const till = {
            offset_x: this.sys.game.config.width / 15,
            width: this.sys.game.config.width - (this.sys.game.config.width / 6),
            offset_y: this.sys.game.config.height - (this.sys.game.config.width - (this.sys.game.config.width / 6) + this.sys.game.config.height / 20),
        }
        for (let x = 0; x < this.max_x; x++) {
            for (let y = 0; y < this.max_y; y++) {
                this.till_bg.push(new Phaser.Geom.Rectangle(
                    till.offset_x + (x * (till.width / this.max_x)),
                    till.offset_y + (y * (till.width / this.max_y)),
                    (till.width / this.max_x),
                    (till.width / this.max_x)));
            }
        }
        // console.log(this.till_bg[0]);
        // this.graphics.lineStyle(1, 0x666666);
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        for (let i = 0; i < this.till_bg.length; i++) {
            this.add.text(
                    this.till_bg[i].x + ((this.till_bg[i].width / 2.5)),
                    this.till_bg[i].y + (this.till_bg[i].width / 5),
                    this.words[i])
                .setFontFamily('Tahoma')
                .setFontSize(this.till_bg[i].width / 2.5)
                .setColor('#222')
                .setAlign("center");
            // .setStyle({ rtl: true });

            this.graphics.strokeRectShape(this.till_bg[i]);
            this.graphics.fillRectShape(this.till_bg[i]);
        }

        // Top UI
        this.answer_arr = [];
        this.answer_key_arr = [];

        this.answer_area = this.add.rectangle(
            till.offset_x,
            till.offset_y - 150,
            (this.sys.game.config.width - (till.offset_x * 2)) / 3 * 1.8,
            this.sys.game.config.height / 13);
        this.question_area = this.add.rectangle(
            till.offset_x + ((this.sys.game.config.width - (till.offset_x * 2)) / 3 * 1.8),
            till.offset_y - 150,
            (this.sys.game.config.width - (till.offset_x * 2)) / 3 * 1.2,
            this.sys.game.config.height / 13);

        this.graphics.strokeRectShape(this.answer_area);
        this.graphics.fillRectShape(this.answer_area);
        this.graphics.strokeRectShape(this.question_area);
        this.graphics.fillRectShape(this.question_area);


        this.question_text = this.add.text(
                this.question_area.x + this.question_area.width - 15,
                this.question_area.y + (this.question_area.width / 20),
                this.question, { rtl: true })
            .setFontFamily('Tahoma')
            .setColor('#222')
            .setAlign("right")
            .setFontSize(this.question_area.width / (this.question.length + 2))
            .setSize(this.question_area.width, this.question_area.height)
            // .setPadding(5, 5, 5, 5);

        this.answer_text = this.add.text(
                this.answer_area.x + this.answer_area.width - 5,
                this.answer_area.y + (this.answer_area.height / 10),
                "", { rtl: true })
            .setFontFamily('Tahoma')
            .setFontSize(this.answer_area.width / "".length)
            .setColor('#222')
            .setAlign("right")
            .setSize(this.answer_area.width, this.answer_area.height)
            // .setPadding(5, 5, 5, 5);


        // Events
        this.p_isdown = false;
        // this.input.on('pointerdown', () => {
        //     this.p_isdown = true;
        // }, this);
        this.input.on('pointerup', this.pointer_up, this);
        this.input.on('pointermove', this.pointer_move, this);
        // console.log("hello");
    }

    pointer_up() {
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        for (let i = 0; i < this.till_bg.length; i++) {
            this.graphics.strokeRectShape(this.till_bg[i]);
            this.graphics.fillRectShape(this.till_bg[i]);
        }
        this.answer_arr = [];
        this.answer_key_arr = [];
        this.answer_text.setText("")
    }

    check_pointer_way(i) {
        if (this.answer_key_arr[this.answer_key_arr.length - 1] === i) {
            return true;
        }
        this.graphics.fillStyle(0x9e9e9e);
        let index_in_answer = this.answer_key_arr.indexOf(i);
        for (let b = index_in_answer + 1; b < this.answer_key_arr.length; b++) {
            // console.log(this.answer_key_arr[b]);
            this.graphics.strokeRectShape(this.till_bg[this.answer_key_arr[b]]);
            this.graphics.fillRectShape(this.till_bg[this.answer_key_arr[b]]);
        }
        this.answer_arr.splice(index_in_answer + 1);
        this.answer_key_arr.splice(index_in_answer + 1);
        this.answer_text.setText(this.answer_arr.join(""));
        const char_size = (this.answer_arr.join("").length > 8) ? this.answer_arr.join("").length - 3 : 5;
        this.answer_text.setFontSize(this.answer_area.width / (char_size + 1));
    }

    pointer_move(pointer) {
        if (pointer.isDown) {
            // console.log(pointer.position)
            // console.log(pointer.prevPosition)
            // if (Math.abs(pointer.prevPosition.x - pointer.position.x) > 20 || Math.abs(pointer.prevPosition.y - pointer.position.y) > 20) {
            //     console.log("must break");
            //     return false;
            // }
            this.graphics.fillStyle(0x2e2e2e);
            this.graphics.lineStyle(2, 0xffffff);
            for (let i = 0; i < this.till_bg.length; i++) {
                if (this.till_bg[i].contains(pointer.x, pointer.y)) {
                    if (this.answer_key_arr.includes(i)) {
                        this.check_pointer_way(i)
                        break;
                    }
                    if (this.answer_key_arr.length !== 0) {
                        if (
                            (this.answer_key_arr[this.answer_key_arr.length - 1] + 1) !== i &&
                            (this.answer_key_arr[this.answer_key_arr.length - 1] - 1) !== i &&
                            (this.answer_key_arr[this.answer_key_arr.length - 1] + this.max_y) !== i &&
                            (this.answer_key_arr[this.answer_key_arr.length - 1] - this.max_y) !== i
                        ) {
                            break;
                        }
                    }
                    this.graphics.fillRectShape(this.till_bg[i]);
                    this.graphics.strokeRectShape(this.till_bg[i]);
                    this.answer_arr.push(this.words[i]);
                    this.answer_key_arr.push(i);
                    this.answer_text.setText(this.answer_arr.join(""));
                    if (this.answer_arr.join("") === this.answer) {
                        this.win();
                    }
                    const char_size = (this.answer_arr.join("").length > 8) ? this.answer_arr.join("").length - 3 : 5;
                    this.answer_text.setFontSize(this.answer_area.width / (char_size + 1));
                    break;
                }
            }

        }

    }

    win()
    {
        setTimeout(() => {
            alert("you win");
            this.scene.start('playGame', {
                // quest: quest,
                // answer: answer,
                // satus: status,
                season_id: this.season_id,
                word_id : this.word_id+1,
            });
        },500);
    }

    make_table(word) {
        return new Promise((resolve, reject) => {
            let word_array = word.split('');
            // resolve(["س", "ل", "ا", "م", "خ", "و", "ب", "ی", "چ"])
            switch (word_array.length) {
                case 2:
                    resolve({ array: ["س", word_array[0], "ا", "م", word_array[1], "و", "ب", "ی", "چ"], size: 3 })
                    break;
                case 3:
                    resolve({ array: ["س", word_array[0], "ا", "م", word_array[1], "و", "ب", word_array[2], "چ"], size: 3 })
                    break;
                case 4:
                    resolve({ array: ["س", word_array[0], "ا", "م", word_array[1], word_array[2], word_array[3], "ب", "چ", "", "", "", "", "", ""], size: 4 })
                    break;
                case 5:
                    resolve({ array: [word_array[0], "ا", "م", word_array[1], "س", "ب", "ب", word_array[2], "ا", "ت", "ف", word_array[3], word_array[4], "", ""], size: 4 })
                    break;
                case 6:
                    resolve({ array: [word_array[0], word_array[1], word_array[2], word_array[3], "س", "ق", word_array[5], word_array[4], "ا", "ی", "ش", "ص", "ق", "غ", "ه"], size: 4 })
                    break;
                case 7:
                    resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], "و", "ش", "م", "ی", "گ", "ذ", "ر", "ه", "ب", "ب", "م", "ج"], size: 5 })
                    break;
                case 8:
                    resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", "ی", "گ", "ذ", "ر", "ه", "ب", "ب", "م", "ج"], size: 5 })
                    break;
                case 9:
                    resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", "ی", "گ", word_array[8], "ر", "ه", "ب", "ب", "م", "ج"], size: 5 })
                    break;
                case 10:
                    resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", "ی", word_array[9], word_array[8], "ر", "ه", "ب", "ب", "م", "ج"], size: 5 })
                    break;
                case 11:
                    resolve({ array: ["س", word_array[0], "ا", "م", "خ", "و", word_array[1], "ی", word_array[5], word_array[6], "ب", word_array[2], word_array[3], word_array[4], word_array[7], "ش", "م", word_array[10], word_array[9], word_array[8], "ر", "ه", "ب", "ب", "م", "ج"], size: 5 })
                    break;
            }
        })
    }

}


export default playGame;