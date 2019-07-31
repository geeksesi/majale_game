import { user_data, use_hint, finish_level, play_game_data, check_season_finished } from './server';
import { make_road } from './game_tools/game_design';
import { make_table } from './game_tools/mechanism';

class playGame extends Phaser.Scene {

    constructor() {
        super({ key: 'playGame' });
    }

    init(data) {
        if (typeof data.word_data[data.word_id] === 'undefined') {
            console.log('i have no lvl for you')
            this.scene.start('mainMenu');
            return false
        }
        // this.season_id = data.season_id;
        this.word_id = data.word_id;
        this.language_id = data.language_id;
        // console.log(data.language_id);
        this.make_table = make_table;
        // console.log(data)
        this.word_data = data.word_data;
        this.season_id = data.word_data[data.word_id].season_id;
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

        // this.word_data = await get_word(this.season_id);

        this.question = this.word_data[this.word_id].word
        this.status = this.word_data[this.word_id].status
        this.answer = this.word_data[this.word_id].answer.word
        this.table_data = await this.make_table(this.answer);

        this.user = await user_data();
        // console.log(this.user);
        this.crdit_value = this.user.credit;

        this.start_time = Math.floor(Date.now() / 1000);

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
            if (this.hint_buttom.contains(pointer.x, pointer.y)) {
                if (!this.hint_click && !this.is_win) {
                    console.log("pointerDown")

                    this.hint();
                }
            }
        }, this);
        this.input.on('pointerup', this.pointer_up, this);
        this.input.on('pointermove', this.pointer_move, this);


        // console.log("hello");
    }


    async hint() {
        this.hint_click = true;
        if (this.crdit_value >= 10 && await use_hint(this.word_data[(this.word_id)].id)) {
            this.crdit_value -= 10;
            await this.credit_text.setText("")
            await this.credit_ui();
            await this.hint_key_arr.push(this.table_data.keys[this.hint_arr.length]);
            await this.hint_arr.push(this.table_data.array[this.table_data.keys[this.hint_arr.length]]);
        } else {
            console.log("warning on hint")
        }
        // console.log(this.hint_key_arr)
        setTimeout(() => { this.hint_click = false; }, 500)

    }


    pointer_up() {
        if (!this.is_win) {
            this.answer_arr = [];
            this.answer_key_arr = [];
            this.answer_text.setText('')
                // console.log(this.hint_key_arr)
            this.graphics.fillStyle(0x2e2e2e);
            this.graphics.lineStyle(3, 0xffffff);
            this.hint_key_arr.forEach(each => {
                this.graphics.strokeRectShape(this.till_bg[each]);
                this.graphics.fillRectShape(this.till_bg[each]);
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
        if (pointer.isDown && !this.is_win) {

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
        if (this.is_win) {
            return true;
        }
        // this.scene.pause();
        this.is_win = true;
        this.finish_time = Math.floor(Date.now() / 1000);
        let is_hint = false;
        setTimeout(async() => {
            if (this.hint_arr.length > 0) {
                is_hint = true;
            }
            // console.log(this.word_data[this.word_id].status)
            let finish_detail = await finish_level(this.word_data[this.word_id].id, (this.finish_time - this.start_time), is_hint, this.word_data[this.word_id].status);
            // console.log(finish_detail);

            this.win_ui();
        }, 500);
    }

    show_loading() {
        console.log("loading")
    }

    stop_loading() {
        console.log("stop loading")
    }

    async win_ui_event(type) {
        console.log(this.season_id + " " + this.word_data[this.word_id + 1].season_id)
        this.is_win = false;

        if (type === "next") {

            if (typeof this.word_data[(this.word_id + 1)] === 'undefined') {
                this.show_loading();
                let data = await play_game_data();
                await make_road(data.word_list, data.finished_word, data.remembers_word, this.language_id, res => {
                    if (res.length < 1) {
                        console.log("i have no lvl")
                        this.scene.start('mainMenu');
                    }
                    this.stop_loading();
                    this.scene.start('playGame', {
                        word_id: 0,
                        language_id: this.language_id,
                        word_data: res
                    });
                })

            } else {
                this.scene.start('playGame', {
                    word_id: this.word_id + 1,
                    language_id: this.language_id,
                    word_data: this.word_data
                });
            }
        } else {
            this.scene.start('mainMenu');
        }
    }

    async animation_finished() {
        const check_season = await check_season_finished(this.season_id);
        console.log(check_season);
        if (check_season) {
            this.scene.start('season_finish', { season_id: this.season_id });
        }
    }

    // UI

    win_ui() {
        this.win_bg = this.add.image(
                (this.sys.game.config.width / 2),
                (this.sys.game.config.height / 2),
                // 0,`
                // 0,`
                'win_bg')
            .setDisplaySize(
                (this.sys.game.config.width - 100),
                (this.sys.game.config.height - 300)

            )

        this.next_level_text = this.add.text(
                (this.sys.game.config.width / 2) - 20,
                (this.sys.game.config.height / 2) + 50,
                "Next", { rtl: false })
            .setFontFamily('Tahoma')
            .setColor('#222')
            .setAlign("right")
            .setFontSize(this.question_area.width / (this.question.length + 2))
            .setSize(this.question_area.width, this.question_area.height)

        this.menu_text = this.add.text(
                (this.sys.game.config.width / 2) - 20,
                (this.sys.game.config.height / 2) - 50,
                "MainMenu", { rtl: false })
            .setFontFamily('Tahoma')
            .setColor('#222')
            .setAlign("right")
            .setFontSize(this.question_area.width / (this.question.length + 2))
            .setSize(this.question_area.width, this.question_area.height)

        this.next_level_text.setInteractive();
        this.next_level_text.on('pointerdown', () => { this.win_ui_event("next") }, this);
        this.menu_text.setInteractive();
        this.menu_text.on('pointerdown', () => { this.win_ui_event("menu") }, this);

        setTimeout(() => {
            this.animation_finished();
        }, 1000)
    }

    credit_ui() {
        this.credit_text = this.add.text(
                (this.sys.game.config.width / 20),
                (this.sys.game.config.height / 14),
                "$ " + this.crdit_value, { rtl: false })
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
            .setFontSize(this.question_area.width / (this.question.length + 1))
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