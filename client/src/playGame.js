import { get_word } from './server';
import { make_table } from './game_tools/mechanism';
class playGame extends Phaser.Scene {

    constructor() {
        super({ key: 'playGame' });
    }

    init(data) {
        this.season_id = data.season_id;
        this.word_id = data.word_id;
        this.make_table = make_table;
        // console.log(data)
    }
    preload() {

    }

    async variables() {
        // console.log("here")

        this.till = {
            offset_x: this.sys.game.config.width / 15,
            width: this.sys.game.config.width - (this.sys.game.config.width / 6),
            offset_y: this.sys.game.config.height - (this.sys.game.config.width - (this.sys.game.config.width / 6) + this.sys.game.config.height / 20) - (this.sys.game.config.height / 8),
        }

        this.hint_arr = [];
        this.hint_key_arr = [];
        this.hit_count = 0;

        this.answer_arr = [];
        this.answer_key_arr = [];

        this.word_data = await get_word(this.season_id);

        this.question = this.word_data[this.word_id].word
        this.status = this.word_data[this.word_id].status
        this.answer = this.word_data[this.word_id].answer.word
        this.table_data = await this.make_table(this.answer);

        this.crdit_value = 10;

    }



    async create() {
        // this.words =this.add.group()
        // this.add.grid(0, 0, 50 * 6, 50 * 5, 50, 50, 0x999999, 1, 0x666666).setOrigin(0);
        await this.variables();
        this.graphics = this.add.graphics({ fillStyle: { color: 0x9e9e9e } });
        await this.table_ui();
        await this.hint_ui();
        await this.answer_ui();
        await this.credit_ui();

        this.hint_click = false;

        // Events
        this.input.on('pointerdown', (pointer) => {
            // console.log("pointerDown")
            if (this.hint_buttom.contains(pointer.x, pointer.y)) {
                if (!this.hint_click) {
                    this.hint_click = true;
                    // console.log("here1 "+ this.table_data.array.indexOf(this.answer.split('')[this.hint_arr.length]));
                    this.hint_key_arr.push(this.table_data.array.indexOf(this.answer.split('')[this.hint_arr.length]));
                    this.hint_arr.push(this.answer.split('')[this.hint_arr.length]);
                    // console.log(this.hint_key_arr)
                    setTimeout(() => { this.hint_click = false; }, 500)

                }
            }
        }, this);
        this.input.on('pointerup', this.pointer_up, this);
        this.input.on('pointermove', this.pointer_move, this);
        // console.log("hello");
    }

    pointer_up() {
        this.answer_arr = [];
        this.answer_key_arr = [];
        this.answer_text.setText('')
            // console.log(this.hint_key_arr)
        this.graphics.fillStyle(0x2e2e2e);
        this.graphics.lineStyle(3, 0xffffff);
        let m = 0;
        this.hint_key_arr.forEach(each => {
            // console.log(each)
            this.graphics.strokeRectShape(this.till_bg[each]);
            this.graphics.fillRectShape(this.till_bg[each]);
            // this.answer_key_arr.push(each);
            // await this.answer_arr.push(this.hint_arr[m])  
            // m++;
        })
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        for (let i = 0; i < this.till_bg.length; i++) {
            if (this.hint_key_arr.includes(i)) {
                continue;
            }
            this.graphics.strokeRectShape(this.till_bg[i]);
            this.graphics.fillRectShape(this.till_bg[i]);
        }

        this.answer_arr = this.hint_arr.slice();
        this.answer_key_arr = this.hint_key_arr.slice();
        this.answer_text.setText(this.hint_arr.join(''))
        if (this.answer_arr.join("") === this.answer) {
            this.win();
        }
    }

    check_pointer_way(i) {
        if (this.answer_key_arr[this.answer_key_arr.length - 1] === i) {
            // console.log(this.answer_key_arr[this.answer_key_arr.length - 1])
            return true;
        }
        this.graphics.fillStyle(0x9e9e9e);
        let index_in_answer = this.answer_key_arr.indexOf(i);
        for (let b = index_in_answer + 1; b < this.answer_key_arr.length; b++) {
            if (this.hint_key_arr.indexOf(this.answer_key_arr[b])) {
                // return true;
                // break;
                // continue;
            }
            // console.log(i);
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
            this.graphics.lineStyle(3, 0xffffff);
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
                    // console.log(this.hint_arr)
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

    win() {
        setTimeout(() => {
            console.log("you win");
            alert("you win");
            this.scene.start('playGame', {
                season_id: this.season_id,
                word_id: this.word_id + 1,
            });
        }, 500);
    }

    // UI

    credit_ui() {
        this.credit_text = this.add.text(
            (this.sys.game.config.width / 20),
            (this.sys.game.config.height / 14),
            "$ "+this.crdit_value, { rtl: false })
        .setFontFamily('Tahoma')
        .setColor('#222')
        .setAlign("right")
        .setFontSize(this.question_area.width / (this.question.length + 2))
        .setSize(this.question_area.width, this.question_area.height)
    }

    answer_ui() {

        this.answer_area = this.add.rectangle(
            this.till.offset_x,
            this.till.offset_y - (this.sys.game.config.height / 6),
            (this.sys.game.config.width - (this.till.offset_x * 2)) / 3 * 1.8,
            this.sys.game.config.height / 13);
        this.question_area = this.add.rectangle(
            this.till.offset_x + ((this.sys.game.config.width - (this.till.offset_x * 2)) / 3 * 1.8),
            this.till.offset_y - (this.sys.game.config.height / 6),
            (this.sys.game.config.width - (this.till.offset_x * 2)) / 3 * 1.2,
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
            .setFontSize(this.answer_area.width / 6)
            .setColor('#222')
            .setAlign("right")
            .setSize(this.answer_area.width, this.answer_area.height)
            // .setPadding(5, 5, 5, 5);
    }

    table_ui() {

        this.till_bg = [];

        this.words = this.table_data.array;
        this.till_words = []
            // const max_x = 3;
            // const max_y = 3;
        this.max_x = this.table_data.size;
        this.max_y = this.table_data.size;

        for (let x = 0; x < this.max_x; x++) {
            for (let y = 0; y < this.max_y; y++) {
                this.till_bg.push(new Phaser.Geom.Rectangle(
                    this.till.offset_x + (x * (this.till.width / this.max_x)),
                    this.till.offset_y + (y * (this.till.width / this.max_y)),
                    (this.till.width / this.max_x),
                    (this.till.width / this.max_x)));
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


    }


    hint_ui() {
        this.graphics.fillStyle(0x9e9e9e);
        this.graphics.lineStyle(3, 0xffffff);
        this.hint_buttom = new Phaser.Geom.Rectangle(
            this.till.offset_x,
            this.till.offset_y + this.till.width + 20,
            (this.till.width),
            (this.sys.game.config.height / 10))
        this.graphics.strokeRectShape(this.hint_buttom);
        this.graphics.fillRectShape(this.hint_buttom);
        this.add.text(
                this.till.offset_x + (this.till.width / 2) - 35,
                this.till.offset_y + this.till.width + this.sys.game.config.height / 20,
                "راهنمایی")
            .setFontFamily('Tahoma')
            .setFontSize(25)
            .setColor('#222')
            .setAlign("center");


    }

}


export default playGame;